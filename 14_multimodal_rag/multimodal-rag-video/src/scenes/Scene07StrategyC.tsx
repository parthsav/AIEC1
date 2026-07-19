import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT, SZ, T } from "../theme";

const List: React.FC<{ name: string; title: string; color: string; items: string[]; appearAt: number }> = ({
  name,
  title,
  color,
  items,
  appearAt,
}) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name={name}
      style={{
        width: 560,
        borderRadius: 24,
        border: `5px solid ${color}`,
        overflow: "hidden",
        background: "#ffffff",
        opacity: interpolate(frame, [appearAt, appearAt + 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(...EASE_OUT),
        }),
      }}
    >
      <div style={{ background: color, color: "#fff", fontFamily: T.sans, fontSize: SZ.label, fontWeight: 700, padding: "20px 32px" }}>
        {title}
      </div>
      <div style={{ padding: "24px 32px", fontFamily: T.sans, fontSize: SZ.small, color: T.ink, lineHeight: 1.9 }}>
        {items.map((it, i) => (
          <div key={i}>{i + 1}. {it}</div>
        ))}
      </div>
    </Interactive.Div>
  );
};

export const Scene07StrategyC: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 56 }}
    >
      <Interactive.Div
        name="Strategy C headline"
        style={{
          fontFamily: T.font,
          fontSize: 90,
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
        Strategy C · Two judges, one leaderboard
      </Interactive.Div>
      <div style={{ display: "flex", gap: 64, alignItems: "center" }}>
        <List
          name="Text judge list"
          title="Text judge"
          color={T.blue}
          items={["board_notes.md", "gtm_strategy.md", "finance_costs.md"]}
          appearAt={25}
        />
        <Interactive.Div
          name="RRF formula"
          style={{
            fontFamily: T.mono,
            fontSize: SZ.support,
            fontWeight: 700,
            color: T.accent,
            background: T.accentSoft,
            border: `5px solid ${T.accent}`,
            borderRadius: 24,
            padding: "40px 44px",
            textAlign: "center",
            opacity: interpolate(frame, [85, 110], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...EASE_OUT),
            }),
            scale: interpolate(frame, [85, 110], [0.85, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...EASE_OUT),
            }).toString(),
          }}
        >
          RRF
          <div style={{ fontSize: SZ.label, marginTop: 12 }}>1 / (60 + rank)</div>
          <div style={{ fontFamily: T.sans, fontSize: SZ.small, marginTop: 12, fontWeight: 600 }}>
            ranks, never scores
          </div>
        </Interactive.Div>
        <List
          name="Image judge list"
          title="Image judge (CLIP)"
          color={T.green}
          items={["📊 revenue chart", "📊 NPS chart", "📊 churn chart"]}
          appearAt={55}
        />
      </div>
      <Interactive.Div
        name="Strategy C caption"
        style={{
          fontFamily: T.sans,
          fontSize: 56,
          fontWeight: 600,
          color: T.inkSoft,
          textAlign: "center",
          maxWidth: 1700,
          opacity: interpolate(frame, [140, 165], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        Each modality gets its best embedder. Scores differ — placements don't.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
