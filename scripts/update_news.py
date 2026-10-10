import email.utils
import html
import json
import re
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "news.json"
USER_AGENT = "AgriGuideNews/1.0 (+https://github.com)"
SOURCES = [
    ("Ministère de l'Agriculture du Sénégal", "https://agriculture.gouv.sn/feed/"),
    ("Agence de Presse Sénégalaise", "https://aps.sn/feed/?s=agriculture"),
]
VIDEO_FEED = "https://www.youtube.com/feeds/videos.xml?channel_id=UCr_Hc46ImdSWH7u6kAy0-iQ"
AGRICULTURE_TERMS = (
    "agricult", "agro", "élevage", "elevage", "semence", "intrant", "engrais",
    "arachide", "riz", "maïs", "mais", "mil", "sorgho", "fonio", "irrigation",
    "producteur", "campagne agricole", "pastoral", "récolte", "recolte",
)


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=25) as response:
        return response.read()


def local_name(tag):
    return tag.rsplit("}", 1)[-1].split(":")[-1]


def child_text(element, name):
    for child in element:
        if local_name(child.tag) == name:
            return "".join(child.itertext()).strip()
    return ""


def plain_text(markup):
    text = re.sub(r"<[^>]*>", " ", markup or "")
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


class ImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []
        self.metadata = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag.lower() == "img":
            src = values.get("src", "")
            if not src:
                srcset = values.get("srcset", "").split(",")
                if srcset:
                    src = srcset[-1].strip().split(" ")[0]
            if src:
                self.images.append(src)
        if tag.lower() == "meta":
            key = values.get("property", values.get("name", "")).lower()
            if key in ("og:image", "twitter:image") and values.get("content"):
                self.metadata.append(values["content"])


def image_from_markup(markup):
    parser = ImageParser()
    parser.feed(markup or "")
    candidates = parser.metadata + parser.images
    for candidate in candidates:
        if candidate.startswith("//"):
            candidate = "https:" + candidate
        if candidate.startswith("https://"):
            return candidate
    return None


def date_from_rss(value):
    if not value:
        return None
    try:
        parsed = (
            datetime.fromisoformat(value.replace("Z", "+00:00"))
            if "T" in value
            else email.utils.parsedate_to_datetime(value)
        )
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)
    except (TypeError, ValueError, OverflowError):
        return None


def format_date(value):
    return value.isoformat().replace("+00:00", "Z") if value else None


def is_agriculture(text):
    normalized = text.lower()
    return any(term in normalized for term in AGRICULTURE_TERMS)


def load_articles(now):
    articles = []
    seen = set()
    for source, feed_url in SOURCES:
        root = ET.fromstring(fetch(feed_url))
        for item in root.iter():
            if local_name(item.tag) != "item":
                continue
            title = child_text(item, "title")
            link = child_text(item, "link")
            description = child_text(item, "description")
            content = child_text(item, "encoded")
            combined = " ".join((title, description, content))
            if not title or not link or link in seen or not is_agriculture(combined):
                continue
            published = date_from_rss(child_text(item, "pubDate"))
            if published and published < now - timedelta(days=30):
                continue
            seen.add(link)
            image = image_from_markup(content) or image_from_markup(description)
            if not image:
                try:
                    page = fetch(link).decode("utf-8", errors="replace")
                    image = image_from_markup(page)
                except (urllib.error.URLError, TimeoutError, ValueError) as error:
                    print("Could not load article image for {}: {}".format(link, error))
            categories = [
                plain_text("".join(category.itertext()))
                for category in item
                if local_name(category.tag) == "category"
            ]
            excerpt = plain_text(description)
            if len(excerpt) > 360:
                excerpt = excerpt[:357].rsplit(" ", 1)[0] + "…"
            articles.append({
                "title": plain_text(title),
                "excerpt": excerpt,
                "source": source,
                "url": link,
                "publishedAt": format_date(published),
                "image": image,
                "imageLabel": "Photo de l'article" if image else "Photo à venir",
                "category": categories[0] if categories else "Agriculture",
            })
    articles.sort(key=lambda article: article["publishedAt"] or "", reverse=True)
    return articles[:12]


def load_videos():
    root = ET.fromstring(fetch(VIDEO_FEED))
    channel = child_text(root, "title")
    videos = []
    now = datetime.now(timezone.utc)
    for entry in root:
        if local_name(entry.tag) != "entry":
            continue
        title = child_text(entry, "title")
        description = ""
        image = None
        video_id = child_text(entry, "videoId")
        for node in entry.iter():
            name = local_name(node.tag)
            if name == "description" and node.text:
                description = node.text.strip()
            elif name == "thumbnail":
                image = node.attrib.get("url")
        if not video_id or not is_agriculture(title + " " + description):
            continue
        published = date_from_rss(child_text(entry, "published") or child_text(entry, "updated"))
        if published and published > now + timedelta(days=1):
            published = None
        videos.append({
            "title": plain_text(title),
            "description": plain_text(description)[:300],
            "channel": channel or "Ministère de l'Agriculture du Sénégal",
            "url": "https://www.youtube.com/watch?v=" + video_id,
            "embedUrl": "https://www.youtube-nocookie.com/embed/" + video_id + "?rel=0",
            "image": image or "https://i.ytimg.com/vi/{}/hqdefault.jpg".format(video_id),
            "publishedAt": format_date(published),
        })
    videos.sort(key=lambda video: video["publishedAt"] or "", reverse=True)
    return videos[:8]


def main():
    now = datetime.now(timezone.utc)
    data = {
        "updatedAt": format_date(now),
        "articles": load_articles(now),
        "videos": load_videos(),
        "sources": [
            {"name": name, "url": feed_url}
            for name, feed_url in SOURCES
        ] + [{
            "name": "Ministère de l'Agriculture du Sénégal — YouTube",
            "url": "https://www.youtube.com/channel/UCr_Hc46ImdSWH7u6kAy0-iQ",
        }],
    }
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Updated {}: {} articles, {} videos".format(
        OUTPUT, len(data["articles"]), len(data["videos"])
    ))


if __name__ == "__main__":
    main()
