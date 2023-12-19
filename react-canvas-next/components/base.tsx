import { CSSProperties, ReactNode, useMemo } from 'react';
import { PointProp, RotateDirect, ScaleDirect, TransformMatrixDirect, TranslateDirect, makeID, parsePointProp } from '../utils';

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
  lineCap?: 'butt' | 'round' | 'square';
  lineDash?: number[];
  lineDashOffset?: number;
  lineJoin?: 'round' | 'bevel' | 'miter';
  children?: ReactNode;
  close?: boolean;
  /**
   * The transform attribute defines a list of transform definitions
   * 
   * eg.
   * 
   * ```tsx
   * <Rect transform={[translate(10, 20), rotate(Math.PI / 180 * 25), scale(0.5, 0.5)]}
   * ```
   */
  transform?: Array<TranslateDirect | RotateDirect | ScaleDirect | TransformMatrixDirect>  | TranslateDirect | RotateDirect | ScaleDirect | TransformMatrixDirect;
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
