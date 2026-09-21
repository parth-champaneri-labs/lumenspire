# LumenSpire

An editorial digital studio website built with Next.js App Router, TypeScript, and GSAP ScrollTrigger.

## Run

- `npm install`
- `npm run dev` — http://localhost:3000
- `npm run lint`
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

