import { useMemo } from "react";
import { createRoot, type GLRoot } from "@coder-ka/react-gl-fiber";
import Regl from "regl";
import { ReglContext } from "./regl-context";
export function ReglCanvas(props: {
  canvas: React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  >;
  children?: React.ReactNode;
}) {
  const canvasRefCallback = useMemo(() => {
    return (canvas: HTMLCanvasElement | null) => {
      let root: GLRoot;
      if (canvas) {
        const regl = Regl(canvas);

        root = createRoot(regl, {
          render(container) {
            regl.clear({
              color: [0, 0, 0, 0],
              depth: 1,
            });

            container.render();
          },
        });

        root.render(
          <ReglContext.Provider value={regl}>
            {props.children}
          </ReglContext.Provider>
        );
      }

      return () => {
        if (root) {
          root.unmount();
        }
      };
    };
  }, []);

  return <canvas {...props.canvas} ref={canvasRefCallback}></canvas>;
}
