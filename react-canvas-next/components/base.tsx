import { CSSProperties, ReactNode, useMemo } from 'react';
import { PointProp, makeID, parsePointProp } from '../utils';

export type CellId = string;

export interface CellModel<PropsType = Partial<CellProps>> {
  id: CellId;
  type: string;
  props: PropsType;
  children: CellModel[];
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
  /**
   * starting point, short form of x and y
   */
  start?: PointProp;
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

export const Cell: React.FC<CellProps & Record<string, any>> = ({
  start,
  ...props
}) => {
  const cellId = useMemo(makeID, []);
  const [x, y] = parsePointProp(start);
  return <CELL_TAG x={x} y={y} {...props} cellId={cellId} />
}
