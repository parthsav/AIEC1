import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT, SZ, T } from "../theme";

// Real numbers from the executed notebook (Cell 8.1 + Activity 2, n=10)
const RESULTS: Array<{ label: string; value: number }> = [
  { label: "A · cards", value: 1.0 },
  { label: "B · CLIP alone", value: 0.3 },
  { label: "C · two judges", value: 1.0 },
];

export const Scene09Eval: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 70 }}
    >
      <Interactive.Div
        name="Eval headline"
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
        Don't argue. Measure: recall@3
      </Interactive.Div>

      <Interactive.Div name="Recall bars" style={{ display: "flex", flexDirection: "column", gap: 44, width: 1200 }}>
        {RESULTS.map((r, i) => (
          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <div style={{ fontFamily: T.sans, fontSize: SZ.support, fontWeight: 600, color: T.ink, width: 420, textAlign: "right" }}>
              {r.label}
            </div>
            <div style={{ flex: 1, height: 56, background: T.line, borderRadius: 12, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  borderRadius: "0 12px 12px 0",
                  background: T.blue,
                  width: `${
                    interpolate(frame, [35 + i * 20, 85 + i * 20], [0, r.value * 100], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: Easing.bezier(...EASE_OUT),
                    })
                  }%`,
                }}
              />
            </div>
            <div
              style={{
                fontFamily: T.mono,
                fontSize: SZ.support,
                fontWeight: 700,
                color: T.ink,
                width: 180,
                opacity: interpolate(frame, [85 + i * 20, 100 + i * 20], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {r.value.toFixed(2)}
            </div>
          </div>
        ))}
      </Interactive.Div>

      <Interactive.Div
        name="Eval caption"
        style={{
          fontFamily: T.sans,
          fontSize: 56,
          fontWeight: 600,
          color: T.accent,
          textAlign: "center",
          maxWidth: 1700,
          opacity: interpolate(frame, [155, 180], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        Measured on this chapter's corpus — B pays for the gap it can't cross.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
