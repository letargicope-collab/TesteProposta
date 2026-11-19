# TesteProposta Preview

## Source

- Repository: https://github.com/letargicope-collab/TesteProposta
- Branch: `main`
- Imported commit: `fbfb25de052d519b36c7c1af36b52e8e0b8b91cc`
- Untouched repository checkout: `.source-repository/`
- Original exported documents: `repo-original/`

## Preview

The existing React site is served from `src/App.tsx`. The original page styles,
text, branding, contact information, animations and interactions are preserved.
The original HTML exports and their runtime files are available in `public/`.

The 20 images imported with the original page were copied, without alteration, to
`public/images/original/`. Only their URLs in `src/App.tsx` were changed, so
the preview does not depend on Imgur's rate-limited image URLs.

The additional company logo (`q0T8BWz.png`) is also stored locally. It uses the
same carousel slot and styling as the other logos, with `object-fit: contain`
to keep the complete image visible at the largest size that fits the slot.

The sandbox's existing package and Vite configuration have been retained.
No changes have been pushed to GitHub or to the production website.

## Commands

```sh
npm run dev -- --host 0.0.0.0
npm run build
npx tsc --noEmit
```