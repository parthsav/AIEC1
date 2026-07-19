import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT, SZ, T } from "../theme";

export const Scene06StrategyB: React.FC = () => {
  const frame = useCurrentFrame();

  // The query star flies toward the text island and stays there (the gap!)
  const starX = interpolate(frame, [60, 100], [960, 560], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 56 }}
    >
      <Interactive.Div
        name="Strategy B headline"
        style={{
          fontFamily: T.font,
          fontSize: 96,
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
        Strategy B · One shared CLIP map
      </Interactive.Div>

      <Interactive.Div name="Two islands" style={{ position: "relative", width: 1560, height: 480 }}>
        {/* text island */}
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 60,
            width: 620,
            height: 360,
            borderRadius: "50%",
            background: T.blueSoft,
            opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 300,
            top: 90,
            fontFamily: T.sans,
            fontSize: SZ.label,
            fontWeight: 700,
            color: T.blue,
            opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          TEXT ISLAND
        </div>
        {/* image island */}
        <div
          style={{
            position: "absolute",
            right: 120,
            top: 60,
            width: 620,
            height: 360,
            borderRadius: "50%",
            background: T.greenSoft,
            opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 280,
            top: 90,
            fontFamily: T.sans,
            fontSize: SZ.label,
            fontWeight: 700,
            color: T.green,
            opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          IMAGE ISLAND
        </div>
        {/* dots */}
        {[
          [340, 220], [460, 300], [560, 200], [420, 360],
        ].map(([x, y], i) => (
          <div key={`t${i}`} style={{ position: "absolute", left: x, top: y, width: 40, height: 40, borderRadius: "50%", background: T.blue, opacity: interpolate(frame, [30 + i * 6, 45 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
        ))}
        {[
          [1080, 230], [1200, 320], [1310, 210], [1160, 170],
        ].map(([x, y], i) => (
          <div key={`i${i}`} style={{ position: "absolute", left: x, top: y, width: 44, height: 44, borderRadius: 10, background: T.green, opacity: interpolate(frame, [30 + i * 6, 45 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
            <span>📊</span>
          </div>
        ))}
        {/* the query star — lands on the TEXT island */}
        <div
          style={{
            position: "absolute",
            left: starX,
            top: 250,
            fontSize: 76,
            opacity: interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          ⭐
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Modality gap caption"
        style={{
          fontFamily: T.sans,
          fontSize: 58,
          fontWeight: 600,
          color: T.accent,
          textAlign: "center",
          maxWidth: 1700,
          opacity: interpolate(frame, [115, 145], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        The modality gap: your text query lands with the text — every time.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
