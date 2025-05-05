import { Container } from "./container";
import { ConcurrentRoot } from "react-reconciler/constants";
import { createRenderer } from "./renderer";
import { RgfRootNode } from "./rgf-root-node";

export type GLRoot = {
  render: (element: React.ReactNode, callback?: () => void) => void;
  unmount: (callback?: () => void) => void;
};

export function createRoot<TGLContext>(
  gl: TGLContext,
  {
    beforeRender,
    render,
    afterRender,
  }: {
    beforeRender?: (gl: TGLContext) => void;
    render: (container: Container<TGLContext>) => void;
    afterRender?: (gl: TGLContext) => void;
  }
): GLRoot {
  const customRenderer = createRenderer<TGLContext>({
    beforeRender,
    render,
    afterRender,
  });

  const container: Container<TGLContext> = new RgfRootNode<TGLContext>({
    context: {
      gl,
    },
  });

  const root = customRenderer.createContainer(
    container,
    ConcurrentRoot,
    null,
    false,
    null,
    "",
    (e) => {
      console.error(e);
    },
    null
  );

  return {
    render(element: React.ReactNode, callback?: () => void) {
      customRenderer.updateContainer(element, root, null, () => {
        const container: Container<TGLContext> = root.containerInfo;

        container.render();

        callback && callback();
      });
    },
    unmount(callback?: () => void) {
      customRenderer.updateContainer(null, root, null, () => {
        const container: Container<TGLContext> = root.containerInfo;
        container.destroy();

        callback && callback();
      });
    },
  };
}
