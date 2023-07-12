import Reconciler, { Fiber, HostConfig } from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
import { CellStore } from './model';
import { deepCompare } from '../../utils';
import { ShapeModels } from '@/react-canvas-next/components';

export type DataStore = {
  data: CellStore;
  updateCanvas: () => void;
}

type Type = string;
type Props = { [key: string]: any };
type Container = DataStore; // RendererModel;
type Instance = ShapeModels;
type TextInstance = string;

type SuspenseInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type ChildSet = ShapeModels[]; // RendererModel;
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
  createInstance: function (_tagType: string, props: Props, rootContainer: Container, hostContext: any, internalHandle: any): Instance {
    console.log('createInstance:', { _tagType, props, rootContainer, hostContext, internalHandle });
    const { children, type: cellType, ...instanceProps } = props;

    const obj = {
      id: props.cellId,
      type: cellType,
      props: instanceProps,
      children: [],
    };

    return obj;
  },
  createTextInstance: function (text: string, rootContainer: Container, hostContext: any, internalHandle: any): TextInstance {
    console.error("Function not implemented.");
    return text;
  },
  appendInitialChild: function (parent: Instance, child: Instance): void {
    console.log('appendInitialChild:', { parent, child });
    parent.children.push(child);
  },
  finalizeInitialChildren: function (instance: Instance, type: string, props: Props, rootContainer: Container, hostContext: any): boolean {
    console.log('finalizeInitialChildren:', { instance, type, props, rootContainer, hostContext })
    return false;
  },
  prepareUpdate: function (instance: Instance, type: string, oldProps: Props, newProps: Props, rootContainer: Container, hostContext: any) {
    const { children: _newChildren, type: newCellType, ...newInstanceProps } = newProps;
    const { children: _oldChildren, type: oldCellType, ...oldInstanceProps } = oldProps;

    return newCellType !== oldCellType || !deepCompare(newInstanceProps, oldInstanceProps);
  },
  shouldSetTextContent: function (type: string, props: Props): boolean {
    return false;
  },
  getRootHostContext: function (rootContainer: Container) {
    console.error("Function not implemented.");
    return null;
  },
  getChildHostContext: function (parentHostContext: any, type: string, rootContainer: Container) {
    console.error("Function not implemented.");
    return parentHostContext;
  },
  getPublicInstance: function (instance: Instance) {
    return instance;
  },
  prepareForCommit: function (containerInfo: Container): Record<string, any> | null {
    console.error("Function not implemented.");
    return null;
  },
  resetAfterCommit: function (containerInfo: Container): void {
    console.error("Function not implemented.");
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
    console.log('detachDeletedInstance:', node, this);
    console.error("Function not implemented.");
  },
  createContainerChildSet(container): ChildSet {
    console.log('createContainerChildSet:', { container });
    return [];
  },
  appendChildToContainerChildSet(childSet, child: Instance) {
    console.log('appendChildToContainerChildSet:', { childSet, child });
    childSet.push(child);
  },
  finalizeContainerChildren(container, newChildren) {
    console.log('finalizeContainerChildren:', { container, newChildren });
  },
  replaceContainerChildren(container, newChildren) {
    console.log('replaceContainerChildren:', { container, newChildren });
    container.data = { cells: newChildren };
    container.updateCanvas();
  },
  cloneInstance(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle, keepChildren, recyclableInstance) {
    console.log('cloneInstance:', {instance, updatePayload, type, oldProps, newProps, internalInstanceHandle, keepChildren, recyclableInstance})
    const { children: newChildren, type: newCellType, ...newInstanceProps } = newProps;

    let newOne = instance;

    // 属性有变化
    if (updatePayload) {
      newOne = {
        ...newOne,
        type: newCellType,
        props: newInstanceProps,
      }
    }

    if (!keepChildren) {
      newOne = {
        ...newOne,
        children: [],
      }
    }

    return newOne;
  },
};

const reconciler = Reconciler(hostConfig);

export default reconciler;
