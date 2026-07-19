import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT, SZ, T } from "../theme";

const STAGES = ["CHUNK", "EMBED", "STORE", "RETRIEVE", "ANSWER"];

export const Scene02Recap: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 90,
      }}
    >
      <Interactive.Div
        name="Recap headline"
        style={{
          fontFamily: T.font,
          fontSize: SZ.headline,
          fontWeight: 700,
          color: T.ink,
          opacity: interpolate(frame, [0, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        You already know text RAG.
      </Interactive.Div>
      <Interactive.Div
        name="Pipeline chips"
        style={{ display: "flex", gap: 22, alignItems: "center" }}
      >
        {STAGES.map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && (
              <div
                style={{
                  fontSize: SZ.small,
                  color: T.accent,
                  opacity: interpolate(frame, [30 + i * 18, 42 + i * 18], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                →
              </div>
            )}
            <div
              style={{
                fontFamily: T.sans,
                fontSize: SZ.small,
                fontWeight: 700,
                color: T.blue,
                background: T.blueSoft,
                border: `4px solid ${T.blue}`,
                borderRadius: 18,
                padding: "24px 34px",
                opacity: interpolate(frame, [24 + i * 18, 40 + i * 18], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(...EASE_OUT),
                }),
                translate: interpolate(frame, [24 + i * 18, 40 + i * 18], ["0px 30px", "0px 0px"], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(...EASE_OUT),
                }),
              }}
            >
              {s}
            </div>
          </React.Fragment>
        ))}
      </Interactive.Div>
      <Interactive.Div
        name="Recap caveat"
        style={{
          fontFamily: T.sans,
          fontSize: SZ.support,
          color: T.accent,
          fontWeight: 600,
          opacity: interpolate(frame, [130, 160], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      >
        But the door onto the meaning map only accepts text.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
