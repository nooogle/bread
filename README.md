# Bread

Bread is a small MkDocs site for home bread baking notes, flour guides, and sourdough recipes.

## Editing

All site content now lives in `docs/`.

- Edit pages in `docs/`
- Add images in `docs/images/`
- Update navigation in `mkdocs.yml` when you add or move pages

## Local preview

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the dev server:

```bash
mkdocs serve
```

Build the site:

```bash
mkdocs build --strict
```

## Publishing

Pushing to `main` triggers the GitHub Pages workflow in `.github/workflows/pages.yml`.
