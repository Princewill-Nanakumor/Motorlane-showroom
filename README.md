# Motorlane — Virtual Car Showroom

A Next.js 15 App Router SPA that lists vehicles from DummyJSON, supports search/filter, and lets visitors leave comments persisted in `localStorage`.

## Features

- Vehicle catalog from DummyJSON (`/products/category/vehicle`)
- Search by brand, title, and description
- Filters for min/max price, rating, and brand
- Sorting by price, rating, and name
- Vehicle detail page with image gallery and specifications
- Merged comments: API reviews + local comments
- Comment form with Zod + React Hook Form validation
- Comments saved in `localStorage` and restored after refresh
- Responsive layout from 420px to 1440px (plain CSS, no frameworks)
- Unit tests (Vitest) and end-to-end tests (Playwright)

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Zod
- React Hook Form
- Plain CSS
- localStorage
- Vitest
- Playwright
- ESLint
- Prettier

## Setup

```bash
npm install
npx playwright install chromium
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright e2e tests |

## API

Base URL: `https://dummyjson.com`

| Endpoint | Usage |
| --- | --- |
| `GET /products/category/vehicle` | Vehicle list |
| `GET /products/{id}` | Vehicle details |

API helpers live in `lib/api/`.

## Local storage

Key: `car-showroom-comments`

Structure:

```json
{
  "167": {
    "vehicleId": 167,
    "comments": [
      {
        "id": "uuid",
        "vehicleId": 167,
        "name": "Alex",
        "comment": "Great ride",
        "createdAt": "2026-08-07T12:00:00.000Z"
      }
    ]
  }
}
```

Functions: `getComments`, `saveComment`, `deleteComment`, `clearComments`.

## Testing

### Vitest

Covers:

- `commentSchema` validation
- `localStorage` comment helpers
- `filterVehicles` / `sortVehicles`
- comments merge
- API helpers

```bash
npm test
```

### Playwright

Covers:

- Homepage load
- Search
- Vehicle details navigation
- Comment submission
- Comment persistence after refresh
- Form validation

```bash
npm run test:e2e
```

## Project structure

```text
car-showroom/
├── app/                  # App Router pages, loading, error states
├── components/
│   ├── layout/
│   ├── vehicles/
│   ├── comments/
│   └── common/
├── hooks/                # useVehicles, useVehicle, useComments
├── lib/
│   ├── api/
│   ├── storage/
│   ├── validation/
│   └── utils/
├── types/
├── test/                 # Vitest unit tests
├── e2e/                  # Playwright tests
└── public/
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Vehicle list, search, filters |
| `/vehicles/[id]` | Vehicle details, reviews, comment form |

## Deployment

Deploy to Vercel or any Node host that supports Next.js.

Client-side routing note: deep links like `/vehicles/167` must be served by the Next.js app (or rewritten to it). On Vercel this works by default. On static hosts, configure fallbacks so unknown paths reach the app.

```bash
npm run build
npm run start
```

## License

Private test assignment project.
