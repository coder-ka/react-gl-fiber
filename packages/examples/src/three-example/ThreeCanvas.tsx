import { useMemo } from "react";
import { createRoot, type GLRoot } from "@coder-ka/react-gl-fiber";
import * as THREE from "three";
import { ThreeContext, type ThreeContextType } from "./three-context";
export function ThreeCanvas(props: {
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
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer({ canvas });

        const threeContext: ThreeContextType = {
          scene,
          camera,
        };

        root = createRoot(threeContext, {
          render(container) {
            container.render();
            renderer.render(scene, camera);
          },
        });

        root.render(
          <ThreeContext.Provider value={threeContext}>
            {props.children}
          </ThreeContext.Provider>
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
