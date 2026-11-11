# Equine Exchange

Equine Exchange is a responsive React marketplace MVP for discovering horses and following simulated auctions. Buyers can search and filter sample listings, review horse details and breed background, save favorites, and place simulated bids. Sellers can create a sample listing. Listings, bids, and favorites are in-memory demo data and reset when the page is refreshed.

> **Demo limitations:** This is a frontend class project, not a live marketplace. Listings are sample data; bids do not create real offers; there are no accounts, authentication, payment processing, or backend persistence. Seller and buyer pages are demonstrations and are not protected routes.

## Technology

- React 18, Vite, and React Router
- React Context for shared auction and favorites state; local component state for forms and filters
- Wikipedia REST API for supplemental breed summaries
- Vitest, jsdom, and React Testing Library
- Vercel SPA rewrite configuration

## Run locally

Requirements: Node.js 18+ and npm.

```sh
npm install
npm run dev
```

Vite prints a local URL (normally `http://localhost:5173`). To run the production build and tests:

```sh
npm test
npm run build
npm run preview
```

## Routes and features

| Route | View | Features |
| --- | --- | --- |
| `/` | Home | Marketplace introduction and featured horses |
| `/auctions` | Browse auctions | Search by name, breed, location, or discipline; filter by breed and discipline; sort by current bid |
| `/horses/:horseId` | Horse details | Listing details, Wikipedia breed summary, bid history, simulated bid form, and favorite toggle |
| `/seller` | Seller dashboard | Create a horse listing; view listings created in the current session |
| `/account` | Buyer account | Review saved horses for the current session |
| `*` | Not found | Friendly fallback for unknown routes and listing IDs |

## API

The details page requests a public Wikipedia page summary:

```text
GET https://en.wikipedia.org/api/rest_v1/page/summary/{encoded-breed-title}
```

No API key is required. The app shows loading, missing-page, and request-error states and links to the source article when available. Wikipedia is supplemental background only; it does not verify a horse's identity, pedigree, ownership, soundness, training, or health. Auction and listing data are local sample data, not API data.

## Deployment

To deploy, import this repository into [Vercel](https://vercel.com/), keep the default Vite build command (`npm run build`) and output directory (`dist`), then deploy. `vercel.json` rewrites SPA paths to the app entry point so direct navigation to a route works.

**Live deployment URL:** Not deployed yet. Add the Vercel URL here after deployment.

## Screenshots

Screenshots are not included yet. Capture the Home, Browse Auctions, and Horse Details views at desktop and mobile widths after running the app locally or deploying it.

## Known issues and next steps

- Demo changes exist only in memory and reset on refresh; this is intentional for the MVP.
- Images are hosted by Unsplash and require an internet connection.
- Auction dates and bid activity are illustrative; there is no real-time countdown or server-side bid validation.
- Add backend persistence, authentication and role permissions, verified seller/listing workflows, real auction timing, notifications, and compliant payments in a future full-stack release.
