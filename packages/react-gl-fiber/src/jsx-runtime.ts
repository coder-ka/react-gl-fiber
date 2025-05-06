import { DrawFn } from "./draw-fn";
import { Offset } from "./offset";
import type {} from "react";
import type {} from "react/jsx-runtime";
import type {} from "react/jsx-dev-runtime";

export type RgfNodeElementProps = {
  draw?: DrawFn;
  offset?: Offset;
  hidden?: boolean;
  children?: React.ReactNode;
};

interface JSXElements {
  "rgf-node": RgfNodeElementProps;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends JSXElements {}
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements extends JSXElements {}
  }
}

declare module "react/jsx-dev-runtime" {
  namespace JSX {
    interface IntrinsicElements extends JSXElements {}
  }
}
