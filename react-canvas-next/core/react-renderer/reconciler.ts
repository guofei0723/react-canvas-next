import Reconciler, { Fiber, HostConfig } from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
import { CellStore } from './model';
import { deepCompare } from '../../utils';

type Type = string;
type Props = { [key: string]: any };
type Container = { data: CellStore }; // RendererModel;
type Instance = any; //  Cell;
type TextInstance = string;

type SuspenseInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type ChildSet = any; // RendererModel;
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
    const { children, type: cellType, ...instanceProps } = props;
  
    const obj = {
      id: `${Math.random()}`,
      type: cellType,
      props: instanceProps,
      children: [],
    };

    return {
      cellId: obj.id,
      entities: {
        [obj.id]: obj,
      }
    }
  },
  createTextInstance: function (text: string, rootContainer: Container, hostContext: any, internalHandle: any): TextInstance {
    console.error("Function not implemented.");
    return text;
  },
  appendInitialChild: function (parentInstance: Instance, child: Instance): void {
    console.error("Function not implemented.", { parentInstance, child });
    const { cellId: parentId, entities } = parentInstance;
    const { cellId: childId } = child;
    const parent = entities[parentId];
    if (!parent.children.includes(childId)) {
      parent.children.push(childId);
    }
    parentInstance.entities = {
      ...entities,
      ...child.entities,
    };
  },
  finalizeInitialChildren: function (instance: Instance, type: string, props: Props, rootContainer: Container, hostContext: any): boolean {
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
    console.log('createContainerChildSet:', { ...container.data });
    return { ...container.data };
  },
  appendChildToContainerChildSet(childSet, child: Instance) {
    console.log('appendChildToContainerChildSet:', { childSet, child });
    const { cellIds, entities } = childSet;
    childSet.entities = { ...entities, ...child.entities };
    if (!childSet.cellIds.includes(child.cellId)) {
      childSet.cellIds = [...cellIds, child.cellId];
    }
  },
  finalizeContainerChildren(container, newChildren) {
    console.log('finalizeContainerChildren:', { container, newChildren });
  },
  replaceContainerChildren(container, newChildren) {
    console.log('replaceContainerChildren:', { container, newChildren });
    container.data = newChildren;
  },
  cloneInstance(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle, keepChildren, recyclableInstance) {
    console.log('cloneInstance:', {instance, updatePayload, type, oldProps, newProps, internalInstanceHandle, keepChildren, recyclableInstance})
    const { children: _newChildren, type: newCellType, ...newInstanceProps } = newProps;
    const { children: _oldChildren, type: oldCellType, ...oldInstanceProps } = oldProps;

    // 属性有变化
    if (updatePayload) {
      const obj = {
        ...instance.entities[instance.cellId],
        type: newCellType,
        props: newInstanceProps,
      };
      return {
        ...instance,
        entities: {
          ...instance.entities,
          [instance.cellId]: obj,
        }
      };
    }

    return instance;
  },
};

const reconciler = Reconciler(hostConfig);

export default reconciler;
