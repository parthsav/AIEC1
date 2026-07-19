import { AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame } from "remotion";
import { EASE_OUT, T } from "../theme";

export const Scene03Crack: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 60,
      }}
    >
      <Interactive.Div
        name="Crack headline"
        style={{
          fontFamily: T.font,
          fontSize: 106,
          fontWeight: 700,
          color: T.ink,
          textAlign: "center",
          maxWidth: 1700,
          opacity: interpolate(frame, [0, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        $27M exists only in these pixels.
      </Interactive.Div>
      <Interactive.Div
        name="Revenue chart"
        style={{
          border: `5px solid ${T.line}`,
          borderRadius: 24,
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 12px 60px rgba(0,0,0,0.12)",
          opacity: interpolate(frame, [20, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
          scale: interpolate(frame, [20, 50], [0.92, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }).toString(),
        }}
      >
        <Img src={staticFile("fig_revenue_quarterly.png")} style={{ width: 860, display: "block" }} />
      </Interactive.Div>
      <Interactive.Div
        name="Crack subtitle"
        style={{
          fontFamily: T.sans,
          fontSize: 60,
          color: T.accent,
          fontWeight: 600,
          textAlign: "center",
          maxWidth: 1700,
          opacity: interpolate(frame, [110, 140], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        No text file mentions it. Text embeddings are blind here.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
