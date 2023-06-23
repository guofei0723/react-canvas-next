import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface ArcToProps extends Omit<CellPropsBase, 'children'> {
  /**
   * The x-axis coordinate of the starting point.
   */
  x?: number;
  /**
   * The y-axis coordinate of the starting point.
   */
  y?: number;
  /**
   * The x-axis coordinate of the first control point.
   */
  x1: number;
  /**
   * The y-axis coordinate of the first control point.
   */
  y1: number;
  /**
   * The x-axis coordinate of the second control point.
   */
  x2: number;
  /**
   * The y-axis coordinate of the second control point.
   */
  y2: number;
  /**
   * The arc's radius. Must be non-negative.
   */
  r: number;
}

export const ARCTO_TYPE = 'arcto';

export interface ArcToModel extends CellModel<ArcToProps> {
  type: typeof ARCTO_TYPE,
}

/**
 * A circular arc determined by the given control points and radius,
 * corresponding the CanvasRenderingContext2D.arcTo() method of the Canvas 2D API.
 * If starting point (x, y) are set, will begin a new sub-path.  
 * The starting point cannot be the same as the first control point
 */
export const ArcTo: FC<ArcToProps> = (props) => {
  return (
    <CELL_TAG {...props} type={ARCTO_TYPE} />
  )
};