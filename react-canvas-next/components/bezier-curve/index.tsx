import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'

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
  cp1X: number;
  /**
   * The y-axis coordinate of the first control point.
   */
  cp1Y: number;
  /**
   * The x-axis coordinate of the second control point.
   */
  cp2X: number;
  /**
   * The y-axis coordinate of the second control point.
   */
  cp2Y: number;
  /**
   * The x-axis coordinate of the end point.
   */
  endX: number;
  /**
   * The y-axis coordinate of the end point.
   */
  endY: number;
}

export const BEZIERCURVE_TYPE = 'beziercurve';

export interface BezierCurveModel extends CellModel<BezierCurveProps> {
  type: typeof BEZIERCURVE_TYPE,
}

export const BezierCurve: FC<BezierCurveProps> = (props) => {
  return (
    <Cell {...props} type={BEZIERCURVE_TYPE} />
  )
};