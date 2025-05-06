import { createContext, useContext } from "react";
import type { Regl } from "regl";

export const ReglContext = createContext<Regl | null>(null);

export function useRegl() {
  const regl = useContext(ReglContext);
  if (!regl) {
    throw new Error("useRegl must be used within a ReglContext");
  }
  return regl;
}
