import { createHairDriverQrSvg, loadHairDriverLogo } from "@/lib/hair-driver-qr";
import { getSiteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const svg = createHairDriverQrSvg(
    getSiteConfig().qrRedirectUrl,
    await loadHairDriverLogo(),
  );
  const download = new URL(request.url).searchParams.get("download") === "1";

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="hair-driver-review-qr.svg"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": process.env.NODE_ENV === "production" ? "public, max-age=300" : "no-store",
    },
  });
}
