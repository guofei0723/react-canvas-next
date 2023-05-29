import { ReactNode } from "react";
import { Reconciler } from "react-reconciler";
import { RendererModel } from "./model";
import reconciler from "./reconciler";

export default class Root {
  private _unmounted = false;
  private _rootContainer: any;
  private _model: RendererModel;

  constructor(private options: any) {
    this._model = new RendererModel();
    this._rootContainer = reconciler.createContainer(
      this._model,
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
    return this._model.data;
  }

  render(nodes: ReactNode) {
    reconciler.updateContainer(nodes, this._rootContainer);
  }

  unmount() {
    console.error('not implement');
    this._unmounted = true;
  }
}
