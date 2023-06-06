import { CSSProperties, ReactNode } from 'react';

export type CellId = string;

export interface CellModel<PropsType = CellProps> {
  id: CellId;
  type: string;
  props: PropsType;
  children: CellId[];
}

export interface CellProps {
  type: string;
  x?: number;
  y?: number;
  fill?: CSSProperties['color'] | CanvasGradient | CanvasPattern;
  fillRule?: CanvasFillRule;
  stroke?: CSSProperties['color'] | CanvasGradient | CanvasPattern;
  lineWidth?: number;
  children?: ReactNode;
}

export type CellPropsBase = Omit<CellProps, 'type'>;

export const CELL_TAG = 'canvasNextEle';
