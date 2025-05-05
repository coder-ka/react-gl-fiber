export type DummyGL = {
  draw(): void;
};

export function createDummyGL(): DummyGL {
  return {
    draw() {},
  };
}
