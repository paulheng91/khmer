# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Khmer Language Learning App

React + Vite app deployed to GitHub Pages. Duolingo-style flashcard/quiz lessons for learning Khmer.

```bash
cd khmer
npm install
npm run dev       # local dev server
npm run build     # production build
npm run lint      # oxlint
npm run deploy    # build + gh-pages deploy
```

**Architecture:**
- `App.jsx` — top-level state: `activeLesson` (which lesson is open) and `progress` (completed lesson IDs). Routes between `Home` and `Lesson` views.
- `Home.jsx` — lesson tile list; lessons unlock sequentially.
- `Lesson.jsx` — drives a single lesson; renders `FlashCard` or `QuizCard` depending on card type.
- `data/lessons.js` — all lesson content (characters, audio filenames, quiz prompts). This is the file to edit when adding new lessons.
- `useAudio.js` — hook for playing Khmer pronunciation audio from `public/audio/`.
