import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT, SZ, T } from "../theme";

const SEGMENTS = [
  { label: "welcome", w: 130 },
  { label: "revenue", w: 220 },
  { label: "churn", w: 220 },
  { label: "APAC latency", w: 240, hot: true },
  { label: "team", w: 180 },
];

export const Scene10VideoOutro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 64 }}
    >
      <Interactive.Div
        name="Video headline"
        style={{
          fontFamily: T.font,
          fontSize: 94,
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
        Even video: Strategy C wearing a watch.
      </Interactive.Div>

      <Interactive.Div name="Timeline" style={{ display: "flex", gap: 14, alignItems: "center" }}>
        {SEGMENTS.map((s, i) => (
          <div
            key={s.label}
            style={{
              width: s.w,
              height: 96,
              borderRadius: 16,
              border: `5px solid ${s.hot ? T.green : T.blue}`,
              background: s.hot
                ? T.greenSoft
                : T.blueSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: T.sans,
              fontSize: SZ.small,
              fontWeight: 700,
              color: s.hot ? T.green : T.blue,
              opacity: interpolate(frame, [20 + i * 10, 35 + i * 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: s.hot
                ? interpolate(frame, [80, 105], [1, 1.12], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(...EASE_OUT),
                  }).toString()
                : "1",
            }}
          >
            {s.label}
          </div>
        ))}
      </Interactive.Div>

      <Interactive.Div
        name="Timestamp answer"
        style={{
          fontFamily: T.sans,
          fontSize: SZ.support,
          fontWeight: 600,
          color: T.ink,
          background: T.greenSoft,
          border: `5px solid ${T.green}`,
          borderRadius: 20,
          padding: "32px 48px",
          opacity: interpolate(frame, [105, 130], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        "…a regional cache fixed it <span style={{ color: T.green, fontFamily: T.mono }}>[00:26–00:37]</span>"
      </Interactive.Div>

      <Interactive.Div
        name="Closing line"
        style={{
          fontFamily: T.font,
          fontSize: 66,
          fontStyle: "italic",
          color: T.accent,
          textAlign: "center",
          maxWidth: 1600,
          opacity: interpolate(frame, [165, 195], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        The pattern: turn what you can't search into something you can.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
