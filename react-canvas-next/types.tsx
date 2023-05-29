import { RectProps } from './core/react-renderer/model';

export interface ReactCanvasNextElements {
  rcnRect: RectProps;
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends ReactCanvasNextElements {}
  }
}