import { ReactNode } from 'react';
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
      cells: [],
    },

    updateCanvas: () => {
      cancelAnimationFrame(this._updateId);
      this._updateId = requestAnimationFrame(() => {
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
    cancelAnimationFrame(this._updateId);
    this.store.data = { cells: [] };
    this._unmounted = true;
  }
}
