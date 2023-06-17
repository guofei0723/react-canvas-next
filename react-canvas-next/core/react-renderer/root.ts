import { ReactNode } from 'react';
import { CellStore } from './model';
import reconciler, { DataStore } from './reconciler';


export default class Root {
  private _unmounted = false;
  private _rootContainer: any;
  /**
   * data change callback
   */
  public onUpdate: null | (() => void) = null;
  private _updateId: number = 0;
  private store: DataStore = {
    data: {
      cellIds: [],
      entities: {},
    },

    updateCanvas: () => {
      cancelAnimationFrame(this._updateId);
      this._updateId = requestAnimationFrame(() => {
        console.info('update canvas');
        this.onUpdate?.();
      });
    }
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
