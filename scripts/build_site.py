import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "dist"


def main():
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    files = (
        "index.html",
        "agri-app.jsx",
        "agri-styles.css",
        "supabase-config.js",
        "manifest.json",
        "service-worker.js",
        "icon.svg",
        "icon-192.png",
        "icon-512.png",
        "news.json",
        "crop-photo-credits.json",
    )
    for name in files:
        source = ROOT / name
        if source.exists():
            shutil.copy2(source, OUTPUT / name)
    for directory in ("assets",):
        source = ROOT / directory
        if source.exists():
            shutil.copytree(source, OUTPUT / directory)
    (OUTPUT / ".nojekyll").touch()
    print("Prepared GitHub Pages site in {}".format(OUTPUT))


if __name__ == "__main__":
    main()
