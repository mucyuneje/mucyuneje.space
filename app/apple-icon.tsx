import { ImageResponse } from "next/og";

/* Apple-touch-icon (180x180) — circular "</>" mark scaled up from
 * app/icon.tsx, since iOS uses the larger canvas without downscaling. */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 32% 28%, rgba(212,255,61,0.28) 0%, rgba(212,255,61,0) 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "84%",
            height: "84%",
            borderRadius: "50%",
            background: "#0f0f11",
            boxShadow:
              "0 0 0 3px rgba(212,255,61,0.9), 0 0 18px rgba(212,255,61,0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: -2,
              fontSize: 78,
              fontWeight: 800,
              letterSpacing: 3,
              color: "#d4ff3d",
            }}
          >
            {"</>"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}