import { ReactNode } from "react";

export default class Root {
  private _unmounted = false;

  data: any = {};

  constructor(private options: any) {}

  render(nodes: ReactNode) {
    console.error('not implement');
  }

  unmount() {
    console.error('not implement');
    this._unmounted = true;
  }
}
