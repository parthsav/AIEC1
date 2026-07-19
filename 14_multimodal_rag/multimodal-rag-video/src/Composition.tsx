import { Composition } from "remotion";
import { Chapter, TOTAL_DURATION } from "./Chapter";

export const MyComposition = () => {
  return (
    <Composition
      id="MultimodalRAGChapter"
      component={Chapter}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
