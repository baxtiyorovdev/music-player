**Overview**

Music Player — a modern, responsive audio player built with React and Vite. It features a track library, playback controls, and the ability to add tracks by URL or by uploading files.

**Demo / Animated Preview**

You can add an animated preview (GIF or WebM) to the README or project page. Place `demo.gif` or `demo.webm` in the `public/` folder and include it like this:

- Markdown image:

  `![Demo](/demo.gif)`

- HTML image (for styling control):

  `<img src="/demo.gif" alt="Demo" style="max-width:100%; border-radius:12px;" />`

For smoother vector animations use Lottie (`lottie-web`) or the `lottie-react` package to embed JSON animations.

**Quick Start**

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build for production: `npm run build`

**Features**

- Track library with local and remote tracks (`src/songs.ts`).
- Playback: play/pause, next/previous, seek.
- Add tracks by URL or file upload.
- Mark tracks as favorites.
- Responsive UI with a collapsible library sidebar.

**Project Structure**

- `src/` — source code
  - `src/App.tsx` — main app logic (state + audio element)
  - `src/songs.ts` — initial track list
  - `src/components/` — UI components (`Library`, `Player`, `AddTrackModal`, ...)
  - `src/assets/` — covers and audio files (or use `public/` for large media)

**Components**

- `Library`: sidebar with search, track list and favorites.
- `Player`: current track card, progress bar and controls.
- `AddTrackModal`: UI for adding a track via URL or upload.

**How to add animations / screenshots**

1. Record a short screencast (GIF or WebM) showing playback, switching tracks and adding a track. Tools: LICEcap, Peek, OBS.
2. Drop `demo.gif` or `demo.webm` into the project's `public/` folder.
3. Embed it in `README.md` with Markdown or use HTML `<video>` for superior compression (WebM):

```html
<video autoplay loop muted playsinline style="max-width:100%; border-radius:12px;">
  <source src="/demo.webm" type="video/webm" />
</video>
```

4. For subtle UI motion, add CSS animations (put in `src/App.css` or component CSS):

```css
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}
.cover-animate { animation: float 3s ease-in-out infinite; }
```

5. Lottie example (install and use):

```bash
npm install lottie-react
```

```tsx
import Lottie from 'lottie-react'
import animationData from '/animations/player.json'

<Lottie animationData={animationData} style={{ width: 200 }} />
```

**Tips for creating attractive demos**

- Keep demos short (5–12 seconds) and focused: play, skip, add.
- Prefer WebM/MP4 for smaller size and better quality; use GIF only when necessary.
- Store cover images in `src/assets/cover-songs/` for consistent import paths.

**Troubleshooting**

- If remote audio fails due to CORS, use a proxy or host files in `public/`.
- Ensure local assets are referenced correctly for Vite (use imports or `public/`).

**Contributing**

PRs are welcome — add features, fix bugs, or improve the UI/UX.

**License**

MIT — feel free to use, modify and redistribute with attribution.

---

If you want, I can:
- generate a demo GIF from screenshots and add it to `public/` (provide screenshots),
- add a Lottie animation to the app and install `lottie-react`.

Tell me which option you prefer and I'll add it.

## Screenshots

Below are example screenshots you can include in the project README. Drop your images into `public/screenshots/` with the names shown and they will render here.

![Player view](/public/screenshots/demo-1.png)

![Add Track modal](/public/screenshots/demo-2.png)

![Library + Player](/public/screenshots/demo-3.png)

Notes:
- Place your actual images under `public/screenshots/` (e.g. `public/screenshots/demo-1.png`).
- If you'd like, I can add these images for you — either upload them here or tell me where they are in the workspace.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# music-player
