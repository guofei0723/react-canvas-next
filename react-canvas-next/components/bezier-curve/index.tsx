import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface BezierCurveProps extends Omit<CellPropsBase, 'children'> {
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
  cp1x: number;
  /**
   * The y-axis coordinate of the first control point.
   */
  cp1y: number;
  /**
   * The x-axis coordinate of the second control point.
   */
  cp2x: number;
  /**
   * The y-axis coordinate of the second control point.
   */
  cp2y: number;
  /**
   * The x-axis coordinate of the end point.
   */
  endx: number;
  /**
   * The y-axis coordinate of the end point.
   */
  endy: number;
}

export const BEZIERCURVE_TYPE = 'beziercurve';

export interface BezierCurveModel extends CellModel<BezierCurveProps> {
  type: typeof BEZIERCURVE_TYPE,
}

export const BezierCurve: FC<BezierCurveProps> = (props) => {
  return (
    <CELL_TAG {...props} type={BEZIERCURVE_TYPE} />
  )
};