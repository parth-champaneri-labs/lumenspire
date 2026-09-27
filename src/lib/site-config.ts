const clientSlug = "hair-driver";
const qrRedirectPath = `/r/${clientSlug}`;
const productionSiteUrl = "https://lumenspirelabs.com";
const productionReviewAppUrl = "https://hairdriver.lumenspirelabs.com";

/** Accept only an origin, so paths and query strings cannot change a QR or redirect. */
export function normalizeHttpOrigin(value: string, name: string): string {
  const input = value.trim();
  if (!/^https?:\/\//i.test(input)) {
    throw new Error(`${name} must be an absolute HTTP or HTTPS URL`);
  }

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    throw new Error(`${name} must be a valid HTTP or HTTPS URL`);
  }

  if (
    !["http:", "https:"].includes(url.protocol) ||
    !url.hostname ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(`${name} must be an HTTP or HTTPS origin without credentials, path, query, or fragment`);
  }

  return url.origin;
}

export function getSiteConfig(env: NodeJS.ProcessEnv = process.env) {
  const production = env.NODE_ENV === "production";
  const siteUrl = normalizeHttpOrigin(
    env.NEXT_PUBLIC_SITE_URL || (production ? productionSiteUrl : "http://localhost:3000"),
    "NEXT_PUBLIC_SITE_URL",
  );
  const reviewAppUrl = normalizeHttpOrigin(
    env.HAIR_DRIVER_REVIEW_APP_URL || (production ? productionReviewAppUrl : "http://localhost:3001"),
    "HAIR_DRIVER_REVIEW_APP_URL",
  );

  return {
    siteUrl,
    clientSlug,
    qrRedirectPath,
    qrRedirectUrl: new URL(qrRedirectPath, siteUrl).href,
    productionQrRedirectUrl: new URL(qrRedirectPath, productionSiteUrl).href,
    reviewAppUrl,
    qrApiPath: `/api/qr/${clientSlug}`,
  } as const;
}
