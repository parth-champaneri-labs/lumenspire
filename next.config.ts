import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include the fixed local logo in the serverless QR route for self-contained SVGs.
  outputFileTracingIncludes: {
    "/api/qr/hair-driver": ["./public/images/hair-driver-qr-logo.png"],
  },
};

export default nextConfig;
