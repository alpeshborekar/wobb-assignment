# Influencer Search

A polished influencer discovery dashboard built on top of the Wobb frontend assignment starter. Browse creators across Instagram, YouTube, and TikTok, view detailed profiles, and build a persistent shortlist.

### Live Demo

**Live Application:** https://wobb-assignment-two.vercel.app/

## Setup

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # production build
npm run preview    # preview the production build
npm run lint       # eslint
npm test           # run tests
```

## Technologies

- React 19 + TypeScript (strict mode)
- Vite
- Tailwind CSS v4
- React Router v7

## Libraries added

- **zustand** — selected list state with `persist` middleware for localStorage
- **framer-motion** — animations and micro-interactions
- **react-hot-toast** — toast notifications for add/remove actions
- **clsx** — conditional className composition
- **vitest** + **@testing-library/react** — unit and component tests

`react-beautiful-dnd` was removed — unused, and unmaintained for React 19.

## Folder structure

```
src/
  components/
    ui/                   Skeleton, EmptyState primitives
    Layout.tsx            sticky nav with live selected-list badge
    ProfileCard.tsx       memoized card with motion interactions
    ProfileList.tsx       responsive grid with staggered entrance
    ProfileCardSkeleton.tsx
    AddToListButton.tsx   animated add/remove toggle
    PlatformFilter.tsx    spring-animated platform tabs
    VerifiedBadge.tsx
  pages/
    SearchPage.tsx
    ProfileDetailPage.tsx
    SelectedListPage.tsx
  store/
    selectedListStore.ts  zustand store persisted to localStorage
  tests/
    dataHelpers.test.ts
    selectedListStore.test.ts
    AddToListButton.test.tsx
    setup.ts
  utils/
    dataHelpers.ts
    formatters.ts
    profileLoader.ts
  types/index.ts
```

## Features

- Platform filtering (Instagram / YouTube / TikTok) with spring-animated active tab
- Case-insensitive search by username and full name
- Profile detail page with stat grid, verified badge, and platform link
- **Add to List** — add, remove, dedupe by `user_id`, persist via localStorage, dedicated `/list` page, live count badge in nav
- Loading skeletons and empty states throughout
- Fully responsive (1 / 2 / 3 column grid)
- Accessible — `aria-pressed`, `aria-label`, `role="tablist"`, keyboard navigation, focus rings, alt text on all images

## Bugs fixed

- Search compared `username` with raw case while `fullname` was lowercased — capitalized queries returned nothing
- Engagement rate displayed `×10000` instead of `×100`; "Engagements" stat reused the wrong field
- `target="_blank"` link missing `rel="noopener noreferrer"`
- Profile images had no `alt` text
- `ProfileCard` had a hardcoded `w-[700px]` breaking on narrow viewports
- Unused `SearchBar` component and duplicate follower formatter functions removed
- Stale-closure click counter in `SearchPage` served no purpose, removed
- `react-beautiful-dnd` installed but never used

## Performance

- `ProfileCard` wrapped in `React.memo`
- Filter results memoized with `useMemo`
- Platform switches use `useTransition` to show skeletons instead of blocking
- Pages code-split with `React.lazy`

## Tests

31 tests across 3 files covering search/filter logic, the Zustand store (add, remove, dedupe, isSelected, clear), and the AddToListButton component.

## Assumptions

- Selected list is app-wide rather than per-platform; `user_id` is unique across platforms
- No backend — localStorage persistence only

## Trade-offs

- No Set/Map index for the selected list; array scan is fast enough at this dataset size
- No debounce on search — not needed with local JSON data

## Future improvements

- Debounce search for larger remote datasets
- Sort/filter options on the selected list page
- Dark mode (CSS variables are already structured for it)

## Deployment

**Vercel:**

```bash
npm i -g vercel
vercel
```

`vercel.json` includes a catch-all rewrite to `index.html` so `/profile/:username` and `/list` resolve correctly on direct load or refresh.
