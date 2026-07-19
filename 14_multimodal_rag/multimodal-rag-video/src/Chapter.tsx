import { AbsoluteFill, Sequence } from "remotion";
import { T } from "./theme";
import { Scene01Title } from "./scenes/Scene01Title";
import { Scene02Recap } from "./scenes/Scene02Recap";
import { Scene03Crack } from "./scenes/Scene03Crack";
import { Scene04TwoJobs } from "./scenes/Scene04TwoJobs";
import { Scene05StrategyA } from "./scenes/Scene05StrategyA";
import { Scene06StrategyB } from "./scenes/Scene06StrategyB";
import { Scene07StrategyC } from "./scenes/Scene07StrategyC";
import { Scene08Generation } from "./scenes/Scene08Generation";
import { Scene09Eval } from "./scenes/Scene09Eval";
import { Scene10VideoOutro } from "./scenes/Scene10VideoOutro";

// Scene plan at 30 fps — 2100 frames = 70 seconds total
const SCENES: Array<{ name: string; component: React.FC; duration: number }> = [
  { name: "1 · Title", component: Scene01Title, duration: 150 },
  { name: "2 · Text RAG recap", component: Scene02Recap, duration: 210 },
  { name: "3 · The crack ($27M in pixels)", component: Scene03Crack, duration: 210 },
  { name: "4 · The VLM's two jobs", component: Scene04TwoJobs, duration: 210 },
  { name: "5 · Strategy A (cards)", component: Scene05StrategyA, duration: 180 },
  { name: "6 · Strategy B (CLIP + gap)", component: Scene06StrategyB, duration: 240 },
  { name: "7 · Strategy C (RRF)", component: Scene07StrategyC, duration: 240 },
  { name: "8 · Generation reads pixels", component: Scene08Generation, duration: 210 },
  { name: "9 · Evaluation (recall@3)", component: Scene09Eval, duration: 210 },
  { name: "10 · Video + the pattern", component: Scene10VideoOutro, duration: 240 },
];

export const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0);

export const Chapter: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{ background: T.paper }}>
      {SCENES.map((s) => {
        const start = from;
        from += s.duration;
        const Comp = s.component;
        return (
          <Sequence key={s.name} name={s.name} from={start} durationInFrames={s.duration}>
            <Comp />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
