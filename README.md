# SkeLAM project page

Academic project website for **Skeleton-Grounded Latent Action Model for Robot World Models**.

Project URL: https://aopolin-lv.github.io/SkeLAM/

This repository contains the project website, figures, demonstration videos, and paper PDF. It does not contain model training code.

## GitHub Pages

Publish the `main` branch from `/(root)` in **Settings → Pages**. The `.nojekyll` file keeps this static site unchanged. Future pushes update the website automatically.

## Local preview

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this directory and open http://127.0.0.1:4173/.

## Editing

- `index.html`: page content and paper links.
- `styles.css`: layout and typography.
- `script.js`: tabs, figure enlargement, and BibTeX copying.
- `assets/`: paper, figures, and videos.

All three videos autoplay muted and loop, with native controls for sound and pause. The paper is revision 25 (20 pages, 47 references), with a blue globe icon, standard LaTeX magenta project URL, and black Project page label on its first page. Every page header displays the full paper title. Author names in the PDF are separated with LaTeX \quad spacing.

The introduction video is revision 12 (1:38, 1920 × 1080), with consistent z-based latent notation. Its approved narration, subtitles, and timing are unchanged.
