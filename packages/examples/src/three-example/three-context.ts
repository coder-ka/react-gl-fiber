import { createContext, useContext } from "react";
import * as THREE from "three";

export type ThreeContextType = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
};
export const ThreeContext = createContext<ThreeContextType | null>(null);

export function useThree() {
  const three = useContext(ThreeContext);
  if (!three) {
    throw new Error("useThree must be used within a ThreeContext");
  }
  return three;
}
