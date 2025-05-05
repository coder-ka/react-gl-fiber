import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { TestCanvas } from "./TestCanvas";
import { createDummyGL, type DummyGL } from "./DummyGL";
import { RgfNode, useDrawFn } from "@coder-ka/react-gl-fiber";

describe("Rendering test", () => {
  it("renders with text", () => {
    const gl = createDummyGL();
    render(
      <TestCanvas
        gl={gl}
        render={(container) => {
          const gl = container.context.gl;
          container.render();
          expect(gl).toStrictEqual(gl);
        }}
      >
        <Scene gl={gl}></Scene>
      </TestCanvas>
    );
  });
});

export function Scene({ gl }: { gl: DummyGL }) {
  const draw = useDrawFn(() => {
    expect(gl).toStrictEqual(gl);
  }, []);

  return <RgfNode draw={draw}></RgfNode>;
}
