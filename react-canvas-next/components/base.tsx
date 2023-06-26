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
  /**
   * The x-axis coordinate of the starting point.
   */
  x?: number;
  /**
   * The y-axis coordinate of the starting point.
   */
  y?: number;
  fill?: CSSProperties['color'] | CanvasGradient | CanvasPattern;
  fillRule?: CanvasFillRule;
  stroke?: CSSProperties['color'] | CanvasGradient | CanvasPattern;
  lineWidth?: number;
  children?: ReactNode;
  close?: boolean;
}

export type CellPropsBase = Omit<CellProps, 'type'>;
export type CellPropsBaseWithoutChildren = Omit<CellPropsBase, 'children'>;

export const CELL_TAG = 'canvasNextEle';