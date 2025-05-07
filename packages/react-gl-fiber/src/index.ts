import { createElement, useCallback, useEffect, useMemo } from "react";
import { DrawFn } from "./draw-fn";
import { RgfNodeElementProps } from "./props";
import { jsxTagName } from "./jsx";

export function useFrame(
  fn: (delta: number, stop: () => void) => void,
  deps: unknown[] = []
) {
  useEffect(() => {
    let animationHandle: number;
    const stop = () => {
      cancelAnimationFrame(animationHandle);
    };

    let last = performance.now();
    function frame(now: number) {
      const delta = now - last;

      fn(delta, stop);

      last = now;
      animationHandle = requestAnimationFrame(frame);
    }

    animationHandle = requestAnimationFrame(frame);
    return () => {
      stop();
    };
  }, deps);
}

export function useCompile<T>(
  compileFn: () => {
    compiled: T;
    dispose: () => void;
  },
  deps: unknown[] = []
) {
  const { compiled, dispose } = useMemo(() => compileFn(), deps);

  useEffect(() => {
    return () => {
      dispose();
    };
  }, deps);

  return compiled;
}

export function useDrawFn(drawFn: DrawFn, deps: unknown[]) {
  return useCallback(drawFn, deps);
}

export { createRoot } from "./root";
export type { GLRoot } from "./root";
export type { Container } from "./container";

export function RgfNode(props: RgfNodeElementProps) {
  return createElement(jsxTagName, props, props.children);
}
