import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import sharp from "sharp";
import jsQR from "jsqr";
import { getSiteConfig, normalizeHttpOrigin } from "../src/lib/site-config.ts";
import {
  createHairDriverQrSvg,
  loadHairDriverLogo,
  QR_ERROR_CORRECTION,
  QR_LOGO_WIDTH_FRACTION,
  QR_LOGO_CLEARANCE_FRACTION,
  QR_QUIET_ZONE,
} from "../src/lib/hair-driver-qr.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const origin = "http://127.0.0.1:3117";
const appUrl = "http://127.0.0.1:3118";
const config = getSiteConfig({ NODE_ENV: "development", NEXT_PUBLIC_SITE_URL: origin, HAIR_DRIVER_REVIEW_APP_URL: appUrl });
let server;

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt++) {
    try {
      const response = await fetch(`${origin}/r/hair-driver`, { redirect: "manual", signal: AbortSignal.timeout(15000) });
      if (response.status === 307) return;
    } catch { /* Next is still starting. */ }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("Next development server did not start for route tests");
}

before(async () => {
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--webpack", "-H", "127.0.0.1", "-p", "3117"], {
    cwd: root,
    env: { ...process.env, NEXT_PUBLIC_SITE_URL: origin, HAIR_DRIVER_REVIEW_APP_URL: appUrl },
    stdio: "ignore",
  });
  await waitForServer();
});

after(() => server?.kill());

test("normalizes configured origins and derives the permanent QR URL", () => {
  assert.equal(normalizeHttpOrigin("https://lumenspirelabs.com/", "site"), "https://lumenspirelabs.com");
  const production = getSiteConfig({ NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://lumenspirelabs.com/", HAIR_DRIVER_REVIEW_APP_URL: "https://hairdriver.lumenspirelabs.com/" });
  assert.equal(production.qrRedirectPath, "/r/hair-driver");
  assert.equal(production.qrRedirectUrl, "https://lumenspirelabs.com/r/hair-driver");
  assert.equal(production.reviewAppUrl, "https://hairdriver.lumenspirelabs.com");
  for (const value of ["javascript:alert(1)", "data:text/plain,hi", "file:///tmp/a", "https://bad host", "https://example.com/evil", "https://example.com/?url=evil", "https://user:pass@example.com"]) {
    assert.throws(() => normalizeHttpOrigin(value, "site"));
  }
});

test("redirects only the allowed slug, ignoring a hostile query destination", async () => {
  const allowed = await fetch(`${origin}/r/hair-driver?url=https://evil.com`, { redirect: "manual" });
  assert.equal(allowed.status, 307);
  assert.equal(allowed.headers.get("location"), appUrl);
  const unknown = await fetch(`${origin}/r/random`, { redirect: "manual" });
  assert.equal(unknown.status, 404);
  const unknownHtml = await unknown.text();
  assert.match(unknownHtml, /Page not/);
  assert.match(unknownHtml, /noindex/);
});

test("returns a fixed, branded SVG with high correction and four-module quiet zone", async () => {
  const logoFile = new URL("../public/images/hair-driver-qr-logo.png", import.meta.url);
  assert.ok((await stat(logoFile)).size > 0);
  const response = await fetch(`${origin}/api/qr/hair-driver?url=https://evil.com&logo=/tmp/evil`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^image\/svg\+xml/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.match(response.headers.get("content-disposition"), /^inline;/);
  const svg = await response.text();
  const matrix = QRCode.create(config.qrRedirectUrl, { errorCorrectionLevel: "H" }).modules;
  assert.equal(QR_ERROR_CORRECTION, "H");
  assert.equal(QR_QUIET_ZONE, 4);
  const side = Number(svg.match(/viewBox="0 0 (\d+)/)?.[1]);
  assert.equal(matrix.size + 8, side);
  assert.ok(QR_LOGO_WIDTH_FRACTION <= 0.2);
  assert.ok(QR_LOGO_CLEARANCE_FRACTION > QR_LOGO_WIDTH_FRACTION);
  assert.doesNotMatch(svg, /data-qr-logo-plate/);
  assert.match(svg, /data-qr-logo="true"[^>]+href="data:image\/png;base64,/);
  assert.doesNotMatch(svg, /<image[^>]+href="https?:/);
  assert.equal(svg, await (await fetch(origin + "/api/qr/hair-driver")).text());
  await assertDecodes(svg, config.qrRedirectUrl);
  const download = await fetch(`${origin}/api/qr/hair-driver?download=1&text=wrong`);
  assert.match(download.headers.get("content-disposition"), /^attachment; filename="hair-driver-review-qr.svg"$/);
  assert.equal(await download.text(), svg);
  assert.deepEqual(await loadHairDriverLogo(), await readFile(logoFile));
});

test("falls back to a valid plain QR when the fixed logo cannot be read", async () => {
  const previousWarn = console.warn;
  console.warn = () => {};
  try {
    const missingLogo = await loadHairDriverLogo(async () => { throw new Error("test failure"); });
    assert.equal(missingLogo, undefined);
    const svg = createHairDriverQrSvg(config.qrRedirectUrl, missingLogo);
    assert.match(svg, /^<svg /);
    await assertDecodes(svg, config.qrRedirectUrl);
    assert.doesNotMatch(svg, /data-qr-logo=/);
  } finally {
    console.warn = previousWarn;
  }
});

test("the utility page is noindex and the homepage still responds", async () => {
  const page = await fetch(`${origin}/qr/hair-driver`);
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.match(html, /Hair Driver Review QR/);
  assert.match(html, /noindex, nofollow/);
  assert.match(html, /\/api\/qr\/hair-driver/);
  const home = await fetch(origin);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /LumenSpire/);
});

test("unmatched pages use the branded, non-indexable 404 with only the home CTA", async () => {
  const response = await fetch(`${origin}/some-random-page`);
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /Page not/);
  assert.match(html, /The page you’re looking for doesn’t exist or may have moved/);
  assert.match(html, /noindex/);
  assert.match(html, /href="\/"[^>]*>BACK TO HOME/);
  assert.doesNotMatch(html, /OPEN HAIR DRIVER REVIEW|href="\/r\/hair-driver"/);
});

async function assertDecodes(svg, expected) {
  for (const width of [192, 256, 360, 512, 1024]) {
    for (const angle of [0, 90]) {
      const { data, info } = await sharp(Buffer.from(svg)).resize(width, width).rotate(angle).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height);
      assert.equal(decoded?.data, expected, "QR should decode at " + width + "px, rotation " + angle);
    }
  }
}

test("production QR remains scannable with the integrated logo", async () => {
  const url = "https://lumenspirelabs.com/r/hair-driver";
  await assertDecodes(createHairDriverQrSvg(url, await loadHairDriverLogo()), url);
});

