import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT, SZ, T } from "../theme";

const Card: React.FC<{
  name: string;
  emoji: string;
  title: string;
  lineA: string;
  lineB: string;
  color: string;
  soft: string;
  appearAt: number;
}> = ({ name, emoji, title, lineA, lineB, color, soft, appearAt }) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name={name}
      style={{
        width: 640,
        borderRadius: 28,
        border: `6px solid ${color}`,
        background: soft,
        padding: "56px 52px",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        opacity: interpolate(frame, [appearAt, appearAt + 25], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(...EASE_OUT),
        }),
        translate: interpolate(frame, [appearAt, appearAt + 25], ["0px 50px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(...EASE_OUT),
        }),
      }}
    >
      <div style={{ fontSize: 90 }}>{emoji}</div>
      <div style={{ fontFamily: T.sans, fontSize: SZ.support, fontWeight: 700, color }}>{title}</div>
      <div style={{ fontFamily: T.sans, fontSize: SZ.small, color: T.ink, lineHeight: 1.5 }}>
        {lineA}
        <br />
        <span style={{ color: T.inkSoft }}>{lineB}</span>
      </div>
    </Interactive.Div>
  );
};

export const Scene04TwoJobs: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 70,
      }}
    >
      <Interactive.Div
        name="Two jobs headline"
        style={{
          fontFamily: T.font,
          fontSize: 96,
          fontWeight: 700,
          color: T.ink,
          textAlign: "center",
          maxWidth: 1760,
          opacity: interpolate(frame, [0, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        The fix: one seeing model, hired twice.
      </Interactive.Div>
      <div style={{ display: "flex", gap: 64 }}>
        <Card
          name="Archivist card"
          emoji="🗃"
          title="Job 1 · Archivist"
          lineA="Writes a catalog card per image — once, at ingestion."
          lineB="Cards make pictures findable."
          color={T.gold}
          soft={T.goldSoft}
          appearAt={35}
        />
        <Card
          name="Reader card"
          emoji="👁"
          title="Job 2 · Reader"
          lineA="Reads the actual pixels — every question, at answer time."
          lineB="Eyes make answers exact."
          color={T.green}
          soft={T.greenSoft}
          appearAt={80}
        />
      </div>
    </AbsoluteFill>
  );
};
