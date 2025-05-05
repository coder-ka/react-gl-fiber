import type { ReactNode } from "react";
import { useEffect } from "react";
import type { Container } from "react-gl-fiber";
import { createRoot } from "react-gl-fiber";
import type { DummyGL } from "./DummyGL";

export function TestCanvas({
  children,
  gl,
  render,
}: {
  children?: ReactNode;
  gl: DummyGL;
  beforeRender?: (gl: DummyGL) => void;
  render: (container: Container<DummyGL>) => void;
  afterRender?: (gl: DummyGL) => void;
}) {
  useEffect(() => {
    const root = createRoot<DummyGL>(gl, {
      render,
    });

    root.render(children);

    return () => {
      root.unmount();
    };
  }, [children]);

  return null;
}
