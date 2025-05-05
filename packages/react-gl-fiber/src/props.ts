import { DrawFn } from "./draw-fn";
import { Offset } from "./offset";

export type RgfNodeElementProps = {
  draw?: DrawFn;
  offset?: Offset;
  hidden?: boolean;
  children?: React.ReactNode;
};
