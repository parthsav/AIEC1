import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT, SZ, T } from "../theme";

const Step: React.FC<{ label: string; sub: string; appearAt: number; color: string }> = ({
  label,
  sub,
  appearAt,
  color,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontFamily: T.sans,
        border: `5px solid ${color}`,
        borderRadius: 22,
        padding: "36px 48px",
        background: "#ffffff",
        textAlign: "center",
        opacity: interpolate(frame, [appearAt, appearAt + 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(...EASE_OUT),
        }),
      }}
    >
      <div style={{ fontSize: SZ.support, fontWeight: 700, color: T.ink }}>{label}</div>
      <div style={{ fontSize: SZ.small, color: T.inkSoft, marginTop: 12 }}>{sub}</div>
    </div>
  );
};

export const Scene05StrategyA: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 80 }}
    >
      <Interactive.Div
        name="Strategy A headline"
        style={{
          fontFamily: T.font,
          fontSize: 108,
          fontWeight: 700,
          color: T.ink,
          opacity: interpolate(frame, [0, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        Strategy A · Search the cards
      </Interactive.Div>
      <Interactive.Div name="Card flow" style={{ display: "flex", gap: 44, alignItems: "center" }}>
        <Step label="📊 chart" sub="pixels" appearAt={25} color={T.line} />
        <div style={{ fontSize: SZ.support, color: T.accent, opacity: interpolate(frame, [50, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>→</div>
        <Step label="🗃 catalog card" sub={'"Q4 highest at $27M…"'} appearAt={55} color={T.gold} />
        <div style={{ fontSize: SZ.support, color: T.accent, opacity: interpolate(frame, [80, 92], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>→</div>
        <Step label="🗄 text store" sub="ordinary text RAG" appearAt={85} color={T.blue} />
      </Interactive.Div>
      <Interactive.Div
        name="Strategy A caveat"
        style={{
          fontFamily: T.sans,
          fontSize: 60,
          fontWeight: 600,
          color: T.accent,
          textAlign: "center",
          maxWidth: 1700,
          opacity: interpolate(frame, [125, 150], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        Simple — but only as good as what the card mentions.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
