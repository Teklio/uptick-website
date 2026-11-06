import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** 1200×630 social share card (Google Discover, WhatsApp, LinkedIn, X, Facebook). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at 50% 30%, #1f1a5c 0%, #000 65%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
        <div style={{ marginTop: 24, fontSize: 44, fontWeight: 300, color: "#e4e4e7" }}>Web Apps · SaaS · Custom Software</div>
        <div style={{ marginTop: 40, fontSize: 30, color: "#34d399" }}>Malappuram, Kerala · India</div>
      </div>
    ),
    size,
  );
}
