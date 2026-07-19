import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT, SZ, T } from "../theme";

export const Scene01Title: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <Interactive.Div
        name="Kicker"
        style={{
          fontFamily: T.sans,
          fontSize: SZ.label,
          letterSpacing: "0.18em",
          color: T.accent,
          fontWeight: 700,
          opacity: interpolate(frame, [0, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        SESSION 14 · ACME ROBOTICS
      </Interactive.Div>
      <Interactive.Div
        name="Title"
        style={{
          fontFamily: T.font,
          fontSize: SZ.headline + 40,
          fontWeight: 700,
          color: T.ink,
          opacity: interpolate(frame, [10, 45], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
          translate: interpolate(frame, [10, 45], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        Multimodal RAG
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{
          fontFamily: T.sans,
          fontSize: SZ.support,
          color: T.inkSoft,
          opacity: interpolate(frame, [45, 75], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        How a text question finds a picture — and reads it
      </Interactive.Div>
    </AbsoluteFill>
  );
};
