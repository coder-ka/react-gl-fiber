import pacakge from "../package.json";
import Reconciler, { Lane } from "react-reconciler";
import { Container } from "./container";
import { Instance } from "./instance";
import { DefaultEventPriority } from "react-reconciler/constants";
import { RgfNodeElementProps } from "./props";
import { RgfNode } from "./rgf-node";
import { HostContext } from "./host-context";
import { defaultOffset } from "./offset";
import { jsxTagName } from "./jsx";

export type EventPriority = Lane;

export function createRenderer<TGLContext>({
  render,
}: {
  beforeRender?: (gl: TGLContext) => void;
  render: (container: Container<TGLContext>) => void;
  afterRender?: (gl: TGLContext) => void;
}) {
  let priority: EventPriority = DefaultEventPriority;

  const Renderer = Reconciler<
    string,
    RgfNodeElementProps,
    Container<TGLContext>,
    RgfNode<TGLContext>,
    never,
    never,
    never,
    RgfNode<TGLContext>,
    HostContext<TGLContext>,
    never,
    unknown,
    number,
    -1
  >({
    now: Date.now,

    setCurrentUpdatePriority(newPriority: EventPriority): void {
      priority = newPriority;
    },

    getCurrentUpdatePriority(): EventPriority {
      return priority;
    },

    resolveUpdatePriority(): EventPriority {
      return priority;
    },

    runWithPriority<T>(newPriority: EventPriority, fn: () => T): T {
      const previousPriority = priority;
      try {
        priority = newPriority;
        return fn();
      } finally {
        priority = previousPriority;
      }
    },

    detachDeletedInstance(instance: Instance<TGLContext>): void {
      instance.destroy();
    },

    rendererVersion: pacakge.version,
    rendererPackageName: "react-gl-fiber",
    extraDevToolsConfig: null,

    cloneInstance() {
      throw new Error("Not implemented");
    },
    createContainerChildSet() {
      throw new Error("Not implemented");
    },
    appendChildToContainerChildSet() {
      throw new Error("Not implemented");
    },
    finalizeContainerChildren() {
      throw new Error("Not implemented");
    },
    replaceContainerChildren() {
      throw new Error("Not implemented");
    },
    cloneHiddenInstance() {
      throw new Error("Not implemented");
    },
    cloneHiddenTextInstance() {
      throw new Error("Not implemented");
    },

    maySuspendCommit() {
      return false;
    },

    getRootHostContext(
      rootContainerInstance: Container<TGLContext>
    ): HostContext<TGLContext> {
      return {
        gl: rootContainerInstance.context.gl,
      };
    },

    getChildHostContext(
      parentHostContext: HostContext<TGLContext>
    ): HostContext<TGLContext> {
      return parentHostContext;
    },

    getPublicInstance(instance) {
      return instance;
    },

    prepareForCommit() {
      return null;
    },

    beforeActiveInstanceBlur(): void {},

    afterActiveInstanceBlur(): void {},

    resetAfterCommit(containerInfo): void {
      render(containerInfo);
    },

    startSuspendingCommit() {},
    waitForCommitToBeReady() {
      return null;
    },

    createInstance(
      type: string,
      props: RgfNodeElementProps,
      _rootContainerInstance: Container<TGLContext>,
      hostContext: HostContext<TGLContext>
    ): Instance<TGLContext> {
      // console.log("createInstance:", type, props, hostContext);

      if (type === jsxTagName) {
        return new RgfNode({
          draw: props.draw,
          offset: props.offset,
          children: [],
          context: hostContext,
        });
      }

      throw new Error(`type "${type}" not supported`);
    },

    cloneMutableInstance(
      instance: Instance<TGLContext>,
      keepChildren: boolean
    ): Instance<TGLContext> {
      return instance.cloneNode(keepChildren);
    },

    appendInitialChild(
      parentInstance: Instance<TGLContext>,
      child: Instance<TGLContext>
    ): void {
      // console.log("appendInitialChild:", parentInstance, child);
      parentInstance.appendChild(child);
    },

    shouldSetTextContent(): boolean {
      return false;
    },

    createTextInstance() {
      throw new Error("Not implemented");
    },

    cloneMutableTextInstance() {
      throw new Error("Not implemented");
    },

    shouldAttemptEagerTransition(): boolean {
      return false;
    },

    trackSchedulerEvent(): void {},

    resolveEventType() {
      return null;
    },

    resolveEventTimeStamp(): number {
      return 0;
    },

    isPrimaryRenderer: false,
    warnsIfNotActing: true,
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,

    requestPostPaintCallback: requestAnimationFrame,

    getInstanceFromNode() {
      return null;
    },

    preparePortalMount(): void {},

    prepareScopeUpdate(): void {},

    getInstanceFromScope(): null {
      return null;
    },

    // -------------------
    //     Microtasks
    // -------------------
    supportsMicrotasks: true,
    scheduleMicrotask: queueMicrotask,

    // -------------------
    //     Mutation
    // -------------------

    supportsMutation: true,

    finalizeInitialChildren() {
      // if (type === jsxTagName) {
      //   return true;
      // }

      return false;
    },

    // commitMount(instance, type, props, internalInstanceHandle) {
    // console.log(
    //     "commitMount:",
    //     instance,
    //     type,
    //     props,
    //     internalInstanceHandle
    //   );
    // },

    // @ts-expect-error
    commitUpdate(
      instance: Instance<TGLContext>,
      type: string,
      prevProps: RgfNodeElementProps,
      nextProps: RgfNodeElementProps
    ): void {
      // console.log("commitUpdate:", instance, type, prevProps, nextProps);

      if (type === jsxTagName) {
        if (prevProps.draw !== nextProps.draw) {
          // console.log("draw changed.");
          instance.draw = nextProps.draw;
        }

        if (prevProps.offset !== nextProps.offset) {
          // console.log("offset changed.");
          instance.offset = nextProps.offset || defaultOffset;
        }

        if (prevProps.hidden !== nextProps.hidden) {
          // console.log("hidden changed.");
          instance.hidden = nextProps.hidden || false;
        }
      }
    },

    resetTextContent(): void {},

    commitTextUpdate(): void {},

    appendChild(
      parentInstance: Instance<TGLContext>,
      child: Instance<TGLContext>
    ): void {
      // console.log("appendChild:", parentInstance, child);
      parentInstance.appendChild(child);
    },

    appendChildToContainer(
      container: Container<TGLContext>,
      child: Instance<TGLContext>
    ): void {
      // console.log("appendChildToContainer:", container, child);
      container.appendChild(child);
    },

    insertBefore(
      parentInstance: Instance<TGLContext>,
      child: Instance<TGLContext>,
      beforeChild: Instance<TGLContext>
    ): void {
      parentInstance.insertBefore(child, beforeChild);
    },

    insertInContainerBefore(
      container: Container<TGLContext>,
      child: Instance<TGLContext>,
      beforeChild: Instance<TGLContext>
    ): void {
      container.insertBefore(child, beforeChild);
    },

    isSingletonScope(): boolean {
      return false;
    },

    removeChild(
      parentInstance: Instance<TGLContext>,
      child: Instance<TGLContext>
    ): void {
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(
      container: Container<TGLContext>,
      child: Instance<TGLContext>
    ): void {
      container.removeChild(child);
    },

    hideInstance(instance): void {
      instance.hidden = true;
    },
    unhideInstance(instance, props): void {
      instance.hidden = props.hidden || false;
    },

    hideTextInstance(): void {
      throw new Error("Not implemented");
    },
    unhideTextInstance(): void {
      throw new Error("Not implemented");
    },

    clearContainer(container: Container<TGLContext>): void {
      // console.log("clearContainer:", container);
      container.destroy();
    },

    supportsPersistence: false,
    supportsHydration: false,
  });

  Renderer.injectIntoDevTools({
    bundleType:
      typeof process !== "undefined" && process.env.NODE_ENV !== "production"
        ? 1
        : 0,
    rendererPackageName: "react-gl-fiber",
    version: pacakge.version,
  });

  return Renderer;
}
