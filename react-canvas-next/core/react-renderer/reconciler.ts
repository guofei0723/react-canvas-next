import Reconciler, { Fiber, HostConfig } from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
import { Cell, RendererModel } from './model';

type Type = string;
type Props = { [key: string]: any };
type Container = RendererModel;
type Instance = Cell;
type TextInstance = string;

type SuspenseInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type ChildSet = RendererModel;
type TimeoutHandle = any;
type NoTimeout = number | undefined;

export const hostConfig: HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
> = {
  supportsMutation: false,
  supportsPersistence: true,
  supportsHydration: false,
  noTimeout: undefined,
  isPrimaryRenderer: false,
  createInstance: function (type: string, props: Props, rootContainer: Container, hostContext: any, internalHandle: any): Instance {
    return {
      id: `${Math.random()}`,
      type: type.replace(/^rcn/, '').toLowerCase(),
      props,
    };
  },
  createTextInstance: function (text: string, rootContainer: Container, hostContext: any, internalHandle: any): TextInstance {
    console.error("Function not implemented.");
    return text;
  },
  appendInitialChild: function (parentInstance: Instance, child: Instance): void {
    console.error("Function not implemented.");
  },
  finalizeInitialChildren: function (instance: Instance, type: string, props: Props, rootContainer: Container, hostContext: any): boolean {
    return false;
  },
  prepareUpdate: function (instance: Instance, type: string, oldProps: Props, newProps: Props, rootContainer: Container, hostContext: any) {
    console.error("Function not implemented.");
  },
  shouldSetTextContent: function (type: string, props: Props): boolean {
    return false;
  },
  getRootHostContext: function (rootContainer: Container) {
    return null;
  },
  getChildHostContext: function (parentHostContext: any, type: string, rootContainer: Container) {
    return null;
  },
  getPublicInstance: function (instance: Instance) {
    return instance;
  },
  prepareForCommit: function (containerInfo: Container): Record<string, any> | null {
    return null;
  },
  resetAfterCommit: function (containerInfo: Container): void {
  },
  preparePortalMount: function (containerInfo: Container): void {
    console.error("Function not implemented.");
  },
  scheduleTimeout: function (fn: (...args: unknown[]) => unknown, delay?: number | undefined) {
    console.error("Function not implemented.");
  },
  cancelTimeout: function (id: any): void {
    console.error("Function not implemented.");
  },
  getCurrentEventPriority: function (): number {
    console.error("Function not implemented.");
    return DefaultEventPriority;
  },
  getInstanceFromNode: function (node: any): Fiber | null | undefined {
    console.error("Function not implemented.");
    return null;
  },
  beforeActiveInstanceBlur: function (): void {
    console.error("Function not implemented.");
  },
  afterActiveInstanceBlur: function (): void {
    console.error("Function not implemented.");
  },
  prepareScopeUpdate: function (scopeInstance: any, instance: any): void {
    console.error("Function not implemented.");
  },
  getInstanceFromScope: function (scopeInstance: any): Instance | null {
    console.error("Function not implemented.");
    return null;
  },
  detachDeletedInstance: function (node: Instance): void {
    console.error("Function not implemented.");
  },
  createContainerChildSet(container): ChildSet {
    console.log('createContainerChildSet:', { container });
    return container;
  },
  appendChildToContainerChildSet(childSet, child) {
    console.log('appendChildToContainerChildSet:', { childSet, child });
    childSet.addCell(child as Instance)
  },
  finalizeContainerChildren(container, newChildren) {
    console.log('finalizeContainerChildren:', { container, newChildren });
  },
  replaceContainerChildren(container, newChildren) {
    console.log('replaceContainerChildren:', { container, newChildren });
  },
};

const reconciler = Reconciler(hostConfig);

export default reconciler;
