import { AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame } from "remotion";
import { EASE_OUT, SZ, T } from "../theme";

export const Scene08Generation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 52 }}
    >
      <Interactive.Div
        name="Generation headline"
        style={{
          fontFamily: T.font,
          fontSize: 106,
          fontWeight: 700,
          color: T.ink,
          whiteSpace: "nowrap",
          opacity: interpolate(frame, [0, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        Retrieval finds. The VLM reads.
      </Interactive.Div>

      <Interactive.Div name="Prompt assembly" style={{ display: "flex", gap: 56, alignItems: "center" }}>
        <div
          style={{
            border: `5px solid ${T.line}`,
            borderRadius: 24,
            background: "#ffffff",
            padding: 28,
            opacity: interpolate(frame, [25, 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...EASE_OUT),
            }),
          }}
        >
          <div style={{ fontFamily: T.sans, fontSize: SZ.small, color: T.inkSoft, marginBottom: 16 }}>
            into the prompt: the question, the docs — and the pixels
          </div>
          <Img src={staticFile("fig_revenue_quarterly.png")} style={{ width: 560, display: "block", borderRadius: 12 }} />
        </div>
        <div
          style={{
            fontSize: SZ.headline,
            color: T.accent,
            opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          →
        </div>
        <div
          style={{
            width: 620,
            border: `6px solid ${T.green}`,
            background: T.greenSoft,
            borderRadius: 24,
            padding: "48px 44px",
            fontFamily: T.sans,
            fontSize: SZ.support,
            color: T.ink,
            lineHeight: 1.5,
            opacity: interpolate(frame, [90, 115], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...EASE_OUT),
            }),
            translate: interpolate(frame, [90, 115], ["0px 40px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...EASE_OUT),
            }),
          }}
        >
          💬 "Q4 was highest at <b style={{ color: T.green }}>$27M</b>"
          <div style={{ fontSize: SZ.small, color: T.inkSoft, marginTop: 16 }}>
            [fig_revenue_quarterly.png] — read off the pixels
          </div>
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
