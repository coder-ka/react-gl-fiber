import {
  RgfNode,
  useCompile,
  useDrawFn,
  useFrame,
} from "@coder-ka/react-gl-fiber";
import { useState } from "react";
import { useRegl } from "../regl-example";
import REGL from "regl";

interface Props {
  color: REGL.Vec4;
}

interface Uniforms {
  color: REGL.Vec4;
}

interface Attributes {
  position: REGL.Buffer;
}

export function ReglExampleScene() {
  const regl = useRegl();

  const [color, setColor] = useState<REGL.Vec4>([0, 0, 0, 0]);
  useFrame((_delta) => {
    const time = regl.now();
    setColor([
      Math.cos(time * 1000 * 0.001),
      Math.sin(time * 1000 * 0.0008),
      Math.cos(time * 1000 * 0.003),
      1,
    ]);
  }, []);

  const drawTriangle = useCompile(() => {
    const drawTriangle = regl<Uniforms, Attributes, Props>({
      frag: `
      precision mediump float;
      uniform vec4 color;
      void main() {
        gl_FragColor = color;
      }`,

      vert: `
      precision mediump float;
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0, 1);
      }`,

      attributes: {
        position: regl.buffer([
          [-2, -2],
          [4, -2],
          [4, 4],
        ]),
      },

      uniforms: {
        color: (_, p) => p.color,
      },

      count: 3,
    });

    return {
      compiled: drawTriangle,
      dispose() {
        // @ts-expect-error
        drawTriangle.destroy();
      },
    };
  }, [regl]);

  const draw = useDrawFn(
    () =>
      drawTriangle({
        color,
      }),
    [color]
  );

  return <RgfNode draw={draw}></RgfNode>;
}
