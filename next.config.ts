import type { NextConfig } from "next";

const immutableSequenceHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/heroes/bravo-mask/:path*", headers: immutableSequenceHeaders },
      { source: "/cosmos/orla-mask/:path*", headers: immutableSequenceHeaders },
    ];
  },
};

export default nextConfig;
