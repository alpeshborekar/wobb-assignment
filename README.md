# Influencer Search

A polished influencer discovery dashboard built on top of the Wobb frontend assignment starter. Browse creators across Instagram, YouTube, and TikTok, view detailed profiles, and build a persistent shortlist.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

```bash
npm run build    # production build
npm run lint     # eslint
npm run preview  # preview the production build
```

## Technologies

- React 19 + TypeScript (strict mode)
- Vite
- Tailwind CSS v4
- React Router v7

## Libraries added

- **zustand** — state management for the selected list, with the `persist` middleware backing it onto `localStorage`. Replaces the React Context originally planned for this feature.
- **react-hot-toast** — lightweight confirmation toasts for add/remove actions.
- **clsx** — conditional className composition.

`react-beautiful-dnd` was removed: it was an unused dependency and is no longer maintained for React 19 / concurrent rendering.

## Folder structure

```
src/
  components/
    ui/             reusable primitives (Skeleton, EmptyState)
    Layout.tsx       app shell with nav + selected-list badge
    ProfileCard.tsx  memoized search result card
    ProfileList.tsx  responsive grid + empty state
    AddToListButton.tsx
    PlatformFilter.tsx
    VerifiedBadge.tsx
  pages/
    SearchPage.tsx
    ProfileDetailPage.tsx
    SelectedListPage.tsx
  store/
    selectedListStore.ts   zustand store, persisted to localStorage
  utils/
    dataHelpers.ts   search/filter logic over bundled JSON
    formatters.ts    shared number/percentage formatting
    profileLoader.ts dynamic profile JSON loader
  types/index.ts
```

## Features implemented

- Search and platform filtering (Instagram / YouTube / TikTok), case-insensitive on both username and full name.
- Profile detail page with stats, verified badge, and outbound link.
- **Add to List**: select profiles from the search grid or the detail page, prevent duplicates by `user_id`, remove items, persist across refresh via `localStorage`, dedicated `/list` page with an empty state and live count badge in the nav.
- Redesigned UI: card-based layout, responsive grid (1/2/3 columns), consistent spacing and type scale, hover and focus states, loading skeletons, empty states.
- Accessibility: semantic roles on the platform tabs, `aria-pressed`/`aria-label` on the Add to List toggle, keyboard-operable profile cards, visible focus rings, alt text on every image, `rel="noopener noreferrer"` on the external link.

## Assignment checklist

- [x] Bugs fixed (see below)
- [x] UI redesign
- [x] Zustand for the selected-list state
- [x] Add to List (add, dedupe, remove, persist, empty state)
- [x] Code quality refactor
- [x] Performance optimizations
- [x] README

## Bugs fixed

- Search matched `fullname` case-insensitively but compared `username` with raw case, so capitalized queries silently returned nothing.
- The engagement rate on the detail page was multiplied by `10000` instead of `100`, displaying numbers two orders of magnitude too large; it also reused `engagement_rate` for the separate "Engagements" stat instead of the actual `engagements` count.
- `target="_blank"` link to the external profile had no `rel="noopener noreferrer"`, a tab-nabbing security issue.
- Profile images had no `alt` text.
- `ProfileCard` used a hardcoded `w-[700px]`, breaking on any viewport narrower than that.
- An unused `SearchBar` component and a duplicated `formatFollowersLocal`/`formatFollowersDetail` (re-implementing `formatters.ts`) were dead code, removed in favor of the shared formatter.
- `onProfileClick` in `SearchPage` incremented a click counter using a stale closure value in its `console.log` and served no real purpose; removed along with the unused `data-search` DOM attribute.
- `react-beautiful-dnd` was installed but never used and doesn't support React 19's concurrent features; removed.

## Performance optimizations

- `ProfileCard` wrapped in `React.memo`; list rendering only re-renders cards whose props changed.
- `extractProfiles`/`filterProfiles` results memoized with `useMemo`, keyed on platform and query.
- Platform switches wrapped in `useTransition` so the UI shows a skeleton grid instead of blocking on a large re-render.
- Routes are code-split with `React.lazy` so the initial bundle only loads the search page.

## Assumptions

- "Selected list" is scoped to the whole app (not per-platform), since a creator could be deduped across platforms by `user_id` without conflict.
- No backend exists, so persistence is `localStorage` only, as specified in the requirements.

## Trade-offs

- Skipped a global Set/Map index for the selected list given the dataset is small (≤30 sample profiles); would revisit at larger scale.
- Did not add automated tests due to time constraints; would prioritize unit tests for `dataHelpers` and the zustand store next.

## Future improvements

- Add unit/integration tests (Vitest + React Testing Library).
- Debounce search input for larger datasets.
- Sort/filter options on the selected-list page (by platform, follower count).
- Dark mode toggle (CSS variables already support it).

## Deployment

The project is a static Vite build, deployable to Vercel, Netlify, or GitHub Pages.

**Vercel:**

```bash
npm i -g vercel
vercel
```

A `vercel.json` is included with a catch-all rewrite to `index.html` so client-side routes (`/profile/:username`, `/list`) resolve correctly on refresh.
