import { ReactNode } from 'react';
import { CellStore } from './model';
import reconciler from './reconciler';

export default class Root {
  private _unmounted = false;
  private _rootContainer: any;
  private store: { data: CellStore } = {
    data: {
      cellIds: [],
      entities: {},
    },
  };

  constructor(private options: any) {
    this._rootContainer = reconciler.createContainer(
      this.store,
      0,
      null,
      false,
      false,
      'react-canvas-next',
      (error: Error) => console.error(error),
      null
    );
  }

  get data() {
    return this.store.data;
  }

  render(nodes: ReactNode) {
    reconciler.updateContainer(nodes, this._rootContainer);
  }

  unmount() {
    console.error('not implement');
    this._unmounted = true;
  }
}
