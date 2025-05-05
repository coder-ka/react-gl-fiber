import { DrawFn } from "./draw-fn";
import { HostContext } from "./host-context";
import { defaultOffset, Offset } from "./offset";

export class RgfNode<TGLContext> {
  draw?: DrawFn;
  offset: Offset;
  children: RgfNode<TGLContext>[];
  hidden: boolean;
  context: HostContext<TGLContext>;

  constructor(props: {
    draw?: DrawFn;
    offset?: Offset;
    hidden?: boolean;
    children?: RgfNode<TGLContext>[];
    context: HostContext<TGLContext>;
  }) {
    this.draw = props.draw;
    this.offset = props.offset || defaultOffset;
    this.children = props.children || [];
    this.hidden = props.hidden || false;
    this.context = props.context;
  }

  cloneNode(deep: boolean): RgfNode<TGLContext> {
    return new RgfNode({
      draw: this.draw,
      offset: {
        ...this.offset,
      },
      hidden: this.hidden,
      children: deep
        ? this.children.map((x) => x.cloneNode(true))
        : this.children,
      context: {
        ...this.context,
      },
    });
  }

  appendChild(child: RgfNode<TGLContext>) {
    this.children.push(child);
  }

  insertBefore(child: RgfNode<TGLContext>, beforeChild: RgfNode<TGLContext>) {
    const index = this.children.indexOf(beforeChild);
    if (index !== -1) {
      this.children.splice(index, 0, child);
    }
  }

  removeChild(child: RgfNode<TGLContext>) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  render({ parentOffset }: { parentOffset: Offset }) {
    if (this.hidden) return;

    const currentOffset: Offset = {
      x: this.offset.x + parentOffset.x,
      y: this.offset.y + parentOffset.y,
      z: this.offset.z + parentOffset.z,
      w: this.offset.w + parentOffset.w,
    };

    if (this.draw) {
      this.draw({ offset: currentOffset });
    }
    this.children.forEach((child) =>
      child.render({
        parentOffset: currentOffset,
      })
    );
  }

  destroy() {
    this.children.forEach((child) => child.destroy());
    this.children = [];
  }
}
