import { readFile } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

export const QR_ERROR_CORRECTION = "H";
export const QR_QUIET_ZONE = 4;
export const QR_LOGO_WIDTH_FRACTION = 0.17;
export const QR_LOGO_CLEARANCE_FRACTION = 0.195;

const logoFile = path.join(process.cwd(), "public", "images", "hair-driver-qr-logo.png");

export async function loadHairDriverLogo(
  read: (file: string) => Promise<Buffer> = readFile,
): Promise<Buffer | undefined> {
  try {
    return await read(logoFile);
  } catch {
    console.warn("Hair Driver QR logo unavailable; returning a plain QR.");
    return undefined;
  }
}

/** Only the fixed local logo is embedded. Keep structural modules and the quiet zone intact. */
export function createHairDriverQrSvg(qrRedirectUrl: string, logo?: Buffer): string {
  const qr = QRCode.create(qrRedirectUrl, { errorCorrectionLevel: QR_ERROR_CORRECTION });
  const size = qr.modules.size;
  const side = size + QR_QUIET_ZONE * 2;
  const center = side / 2;
  const clearance = side * QR_LOGO_CLEARANCE_FRACTION;
  const logoWidth = side * QR_LOGO_WIDTH_FRACTION;
  const finders = [[0, 0], [size - 7, 0], [0, size - 7]];
  const modules: string[] = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!qr.modules.get(row, col)) continue;
      if (finders.some(([x, y]) => col >= x && col < x + 7 && row >= y && row < y + 7)) continue;
      const x = col + QR_QUIET_ZONE;
      const y = row + QR_QUIET_ZONE;
      const reserved = qr.modules.isReserved(row, col);
      // Excavate whole data modules; no floating badge or border over the QR.
      if (logo && !reserved && Math.abs(x + 0.5 - center) < clearance / 2 && Math.abs(y + 0.5 - center) < clearance / 2) continue;
      modules.push(reserved
        ? `<rect x="${x}" y="${y}" width="1" height="1"/>`
        : `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.48"/>`);
    }
  }

  const eyes = finders.map(([col, row]) => {
    const x = col + QR_QUIET_ZONE;
    const y = row + QR_QUIET_ZONE;
    return `<rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" fill="none" stroke="#111" stroke-width="1"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
  }).join("");
  // Put protected structural modules above the logo even for unusually long URLs.
  const logoMarkup = logo
    ? `<defs><filter id="logo-ink"><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/></filter></defs><image data-qr-logo="true" x="${center - logoWidth / 2}" y="${center - logoWidth / 2}" width="${logoWidth}" height="${logoWidth}" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${logo.toString("base64")}" filter="url(#logo-ink)"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" width="512" height="512" role="img" aria-label="Hair Driver review QR code" shape-rendering="geometricPrecision"><rect width="${side}" height="${side}" fill="#fff"/>${logoMarkup}<g fill="#111">${modules.join("")}${eyes}</g></svg>`;
}


