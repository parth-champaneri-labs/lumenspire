# LumenSpire

An editorial digital studio website built with Next.js App Router, TypeScript, and GSAP ScrollTrigger.

## Run

- `npm install`
- `npm run dev` — http://localhost:3000
- `npm run lint`
- `npm test` — Hair Driver QR, redirect, configuration, and fallback checks
- `npm run build`
- `npm start` — serve the production build

## Editing

- `src/lib/content.ts`: company contact, original project descriptions, capabilities, process, and technologies.
- `src/components`: individual homepage sections in the order composed by `src/app/page.tsx`.
- `src/components/digital/InterfacePreview.tsx`: reusable illustrative website, catalogue, inventory, ERP, and automation screens.
- `src/app/globals.css`: established editorial design, navigation, portfolio, process, and footer.
- `src/app/digital.css`: digital interface compositions and responsive overrides.
- `src/components/animation/ScrollExperience.tsx`: scoped GSAP scroll interactions and cleanup.
- `src/fonts`: locally served DM Sans, Manrope, and Instrument Serif, with their SIL Open Font Licenses.

The original company and portfolio information is preserved. Interface visuals are clearly labelled concepts, not client screenshots. Replace these with approved project screenshots when available. Existing industrial image assets are no longer rendered. No fabricated clients, metrics, or testimonials have been added.

The project brief form prepares a local email draft, with copy/download options. It does not submit to a backend. Contact email: hello@lumenspire.com. No phone or WhatsApp number has been supplied.

## Motion and accessibility

Desktop uses scroll-linked interface layers, clipped project reveals, an orange-to-neutral statement transition, and a sticky process. Mobile uses simpler compositions without desktop pinning. Reduced-motion preferences disable GSAP animations. Navigation and project dialogs support keyboard dismissal; workflow controls and services work by click/tap.

## Verification

Production build (including TypeScript) and ESLint passed. Browser checks covered 1440, 1280, 768, and 390 pixel widths without document horizontal overflow, plus project dialog dismissal, mobile menu, capability accordion, system selection, workflow advancement, and local brief generation. No email was sent.

The installed Windows native SWC binary reports an invalid Win32 binary; Next.js successfully builds with its WASM fallback. A clean dependency install on the deployment machine is recommended.

## Hair Driver review QR

This main website owns the permanent physical QR entry URL `https://lumenspirelabs.com/r/hair-driver`. It returns HTTP 307 to the separately deployed Hair Driver app. The QR always encodes the **main-site** entry URL, so the app location can change without reprinting the stand. This repository does not contain the Hair Driver review app.

Set these in the main project's environment (see `.env.example` for local defaults):

| Environment | `NEXT_PUBLIC_SITE_URL` | `HAIR_DRIVER_REVIEW_APP_URL` |
| --- | --- | --- |
| Laptop | `http://localhost:3000` | `http://localhost:3001` |
| Vercel production | `https://lumenspirelabs.com` | `https://hairdriver.lumenspirelabs.com` |

Configure the Vercel **main-site** project with both production values and redeploy. Configure the `hairdriver.lumenspirelabs.com` DNS and separate Vercel project, then verify that its root opens `/review/hair-driver`. `NEXT_PUBLIC_SITE_URL` is used when generating the QR, so set it for the production build. URL settings accept only HTTP(S) origins, without paths, credentials, queries, or fragments.

- `/r/hair-driver`: 307 redirect to the configured review app. Other `/r/*` slugs return 404.
- `/api/qr/hair-driver`: inline, self-contained SVG with the existing local logo. `?download=1` downloads `hair-driver-review-qr.svg`; other query parameters cannot change the QR.
- `/qr/hair-driver`: noindex preview and download utility, omitted from the site's navigation.

For a real phone test before deployment, connect the laptop and phone to the same Wi-Fi. Find the laptop's LAN IP, for example `192.168.1.50`, and temporarily set the main project's local environment to `NEXT_PUBLIC_SITE_URL=http://192.168.1.50:3000` and `HAIR_DRIVER_REVIEW_APP_URL=http://192.168.1.50:3001`. Start this project with `npm run dev -- -H 0.0.0.0 -p 3000`. Start the separate Hair Driver project on port 3001 bound to `0.0.0.0`. Open this site's `/qr/hair-driver` page on the laptop and scan. The phone should visit `http://192.168.1.50:3000/r/hair-driver`, redirect to port 3001, then reach `/review/hair-driver`. A QR containing `localhost` cannot be scanned from a separate phone: on the phone, `localhost` means the phone itself. Never put a LAN IP in source or a final print.

Before acrylic printing, verify: (1) the Hair Driver subdomain and app are deployed; (2) the main-site production redirect reaches it; (3) both main-site Vercel variables are set; (4) the final SVG encodes exactly `https://lumenspirelabs.com/r/hair-driver`; (5) Android native Camera, Google Lens, and iPhone Camera if available all scan from a laptop display; and (6) a normal-paper print at the intended size scans in normal indoor lighting from about 20–40 cm. Print the QR at approximately **4 cm × 4 cm or larger**, preserving its clean quiet zone. Keep text, borders, and graphics outside that zone. Do not order the final acrylic stand until these checks pass.

