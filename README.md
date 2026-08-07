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
- Responsive layout from 420px to 1440px (plain CSS)

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Zod
- React Hook Form
- Plain CSS
- localStorage
- ESLint

## Setup

```bash
npm install
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

## API

Base URL: `https://dummyjson.com`

| Endpoint | Usage |
| --- | --- |
| `GET /products/category/vehicle` | Vehicle list |
| `GET /products/{id}` | Vehicle details |

## Local storage

Key: `car-showroom-comments`

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

## Project structure

```text
car-showroom/
├── app/
├── components/
│   ├── layout/
│   ├── vehicles/
│   ├── comments/
│   └── common/
├── hooks/
├── lib/
│   ├── api/
│   ├── storage/
│   ├── validation/
│   └── utils/
├── types/
└── public/
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Vehicle list, search, filters |
| `/vehicles/[id]` | Vehicle details, reviews, comment form |

## Deployment

```bash
npm run build
npm run start
```

Deploy to Vercel or any host that supports Next.js. Deep links like `/vehicles/167` must be handled by the Next.js server (default on Vercel).
