# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Type-check + production build
npm run preview  # Preview production build
```

## Architecture

Vite + React 19 + TypeScript app. No external UI libraries — all styling is custom CSS.

**State lives entirely in `App.tsx`**: todos array + active filter. Persisted to `localStorage` under key `todo-claude-list`.

**Data flow**: `App` holds state and passes handlers down to `TodoList → TodoItem`. Editing state is local to `TodoItem`.

**Key types** (`src/types.ts`): `Todo` (id, text, completed, createdAt) and `Filter` ('all' | 'active' | 'completed').

**Styling**: global CSS variables in `src/index.css` (dark theme tokens), component styles in `src/App.css`. All animations and responsive breakpoints are in `App.css`.
