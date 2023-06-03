export interface ReactCanvasNextElements {
  // rcnRect: RectProps;
  canvasNextEle: any
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends ReactCanvasNextElements {}
  }
}