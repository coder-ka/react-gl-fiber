import {
  RgfNode,
  useCompile,
  useDrawFn,
  useFrame,
} from "@coder-ka/react-gl-fiber";
import { useRef, useState } from "react";
import { useThree } from "../three-example";
import * as THREE from "three";

export function ThreeExampleScene() {
  const three = useThree();

  const [cubeState, setCubeState] = useState({ rotation: { x: 0, y: 0 } });
  const [color, setColor] = useState([0, 0, 0, 0]);

  const { cube } = useCompile(() => {
    three.camera.position.z = 2;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    three.scene.add(cube);

    return {
      compiled: {
        cube,
      },
      dispose() {
        three.scene.remove(cube);
        cube.geometry.dispose();
        cube.material.dispose();
      },
    };
  }, []);

  const timeRef = useRef(0);
  useFrame((delta) => {
    const time = timeRef.current;
    setColor([
      Math.cos(time * 0.001),
      Math.sin(time * 0.0008),
      Math.cos(time * 0.003),
      1,
    ]);

    setCubeState((c) => ({
      ...c,
      rotation: {
        x: c.rotation.x + 0.01,
        y: c.rotation.y + 0.01,
      },
    }));

    timeRef.current += delta;
  });

  const draw = useDrawFn(() => {
    cube.rotation.x = cubeState.rotation.x;
    cube.rotation.y = cubeState.rotation.y;
    cube.material.color.setRGB(color[0], color[1], color[2]);
  }, [cube, cubeState, color]);

  return <RgfNode draw={draw}></RgfNode>;
}
