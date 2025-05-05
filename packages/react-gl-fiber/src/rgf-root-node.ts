import { HostContext } from "./host-context";
import { defaultOffset } from "./offset";
import { RgfNode } from "./rgf-node";

export type BeforeRender = (delta: number) => void;

export class RgfRootNode<TGLContext> extends RgfNode<TGLContext> {
  constructor(props: { context: HostContext<TGLContext> }) {
    super(props);
  }

  render() {
    super.render({ parentOffset: defaultOffset });
  }

  destroy() {
    super.destroy();
  }
}
