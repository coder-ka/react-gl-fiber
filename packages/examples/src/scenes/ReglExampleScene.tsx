import { RgfNode, useDrawFn, useFrame } from "@coder-ka/react-gl-fiber";
import { useMemo, useState } from "react";
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
  const [color, setColor] = useState<REGL.Vec4>([0, 0, 0, 0]);
  useFrame((delta) => {
    setColor([
      Math.cos(delta * Math.random() * 100 * 0.001),
      Math.sin(delta * Math.random() * 100 * 0.0008),
      Math.cos(delta * Math.random() * 100 * 0.003),
      1,
    ]);
  }, []);

  const regl = useRegl();
  const drawTriangle = useMemo(
    () =>
      regl<Uniforms, Attributes, Props>({
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
      }),
    [regl]
  );

  const draw = useDrawFn(
    () =>
      drawTriangle({
        color,
      }),
    [color]
  );

  return <RgfNode draw={draw}></RgfNode>;
}
