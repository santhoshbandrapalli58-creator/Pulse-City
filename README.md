# PULSE/CITY

**Move faster. Fail safer.**

PULSE/CITY is a smart-city transport resilience dashboard. It helps city teams explore how cybersecurity weaknesses and transport problems can combine to create real-world risk. The app uses example data and interactive simulations; it is a demo, not a live city monitoring system.

## What you can explore

- **City overview:** resilience score, service indicators, a schematic city map, and recent events.
- **Cybersecurity, privacy, and resilience:** connected-device health, legacy protocols, fleet software updates, GNSS interference, and privacy risk.
- **Transport friction:** induced demand, curbside conflicts, empty fleet mileage, mobility data sharing, and cross-border fares.
- **Threat × friction simulator:** adjust attack conditions and mitigations to compare estimated impacts.
- **AI analyst:** ask questions about the example city data and download a Markdown incident report.
- **Alerts and incidents:** filter, acknowledge, and resolve sample incidents.

## Run it on your computer

### Requirements

- Node.js **22.6 or newer** (the local API uses Node's built-in TypeScript support).
- npm, which is included with Node.js.

### Install and start

1. Open a terminal in the project folder.
2. Install the packages:

   ```bash
   npm install
   ```

3. Start the local API in one terminal:

   ```bash
   npm run server
   ```

4. Open a second terminal in the same project folder and start the website:

   ```bash
   npm run dev
   ```

5. Open the local address printed by Vite, usually [http://localhost:5173](http://localhost:5173).

The website and API can run without credentials. Demo sign-in accepts a valid email address and any password with at least six characters. The “Remember me” option keeps the demo profile on this browser; clear site storage to remove it. The analyst uses a local sample response until a Gemini key is configured. To stop either process, press `Ctrl+C` in its terminal.

## Optional services

Copy `.env.example` to `.env` and fill in only the services you want to use. Restart the local API or website after changing environment values.

| Variable | Used by | What it does |
| --- | --- | --- |
| `GEMINI_API_KEY` | Local API and Vercel Function | Enables Gemini 2.5 Flash responses in the analyst. Keep this value server-side; do not rename it to `VITE_GEMINI_API_KEY`. |
| `PORT` | Local API | Changes the API port. It defaults to `8787`. |
| `VITE_FIREBASE_API_KEY` | Website | Firebase project configuration for authentication. |
| `VITE_FIREBASE_AUTH_DOMAIN` | Website | Firebase Authentication domain. |
| `VITE_FIREBASE_PROJECT_ID` | Website | Firebase project ID. |
| `VITE_FIREBASE_APP_ID` | Website | Firebase app ID. |

Firebase is optional. Configure all four `VITE_FIREBASE_*` values and enable the desired sign-in providers in Firebase Console to use Firebase Authentication. These browser settings identify your Firebase project; protect the project by configuring authorized domains and appropriate Firebase rules. The Gemini key is private and must only be configured as a server environment variable.

## Deploy with Vercel CLI

The project includes `vercel.json`. Vercel builds the Vite website and deploys `api/analyst.ts` as the `/api/analyst` serverless endpoint.

1. Install the Vercel CLI if needed:

   ```bash
   npm install --global vercel
   ```

2. Sign in and connect this folder to a Vercel project:

   ```bash
   vercel login
   cd path/to/Pulse-City
   vercel link
   ```

   Follow the prompts to select your Vercel account and create or select a project.

3. Add the Gemini key to the Vercel project if you want live AI responses:

   ```bash
   vercel env add GEMINI_API_KEY production
   ```

   Paste the key when prompted. If you use Firebase Authentication, add each `VITE_FIREBASE_*` variable to Vercel as well. Vite reads `VITE_` variables while building, so make sure they are available to the production build.

4. Build locally to check the production bundle, then deploy:

   ```bash
   npm run build
   vercel deploy --prod
   ```

Vercel prints the deployment URL when it finishes. If you add or change environment variables later, deploy again for the new values to take effect. Do not add `GEMINI_API_KEY` with a `VITE_` prefix: that would expose it in the browser bundle.

## Project layout

```text
api/       Vercel serverless API for Gemini analyst requests
server/    Express API used during local development
src/       React application, pages, components, data, and styles
```

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite website. |
| `npm run server` | Start the local Express API on port 8787 by default. |
| `npm run build` | Type-check and create the production site in `dist/`. |
| `npm run preview` | Preview the built website locally. |

## Demo data and production use

The devices, events, traffic conditions, and simulation outputs are seeded example data. They are meant to demonstrate the interface and are not validated predictions or operational advice. The local demo sign-in is not a production identity system. Before using this app with real city infrastructure or personal data, connect trusted data sources and add production-grade authentication, server-side authorization, persistent audit logging, and operational review.
