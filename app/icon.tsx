import { ImageResponse } from "next/og";

/* Circular code-bracket favicon ("</>") on a dark ring with a soft lime
 * glow — an instantly recognizable software-dev mark. Auto-generates the
 * favicon via Next.js `icon` File Convention. */

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 1,
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