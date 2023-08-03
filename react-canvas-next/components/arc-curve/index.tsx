import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { PointProp, parsePointProp } from '../../utils';

export interface ArcCurveProps extends Omit<CellPropsBase, 'children'> {
  // /**
  //  * The x-axis coordinate of the starting point.
  //  */
  // x?: number;
  // /**
  //  * The y-axis coordinate of the starting point.
  //  */
  // y?: number;
  /**
   * The x-axis coordinate of the first control point.
   */
  cp1X?: number;
  /**
   * The y-axis coordinate of the first control point.
   */
  cp1Y?: number;
  /**
   * The coordinate of the first control point.
   * Short form of cp1X and cp1Y
   */
  control1?: PointProp;
  /**
   * The x-axis coordinate of the second control point.
   */
  cp2X?: number;
  /**
   * The y-axis coordinate of the second control point.
   */
  cp2Y?: number;
  /**
   * The coordinate of the second control point.
   * Short form of cp2X and cp2Y
   */
  control2?: PointProp;
  /**
   * The arc's radius. Must be non-negative.
   */
  r: number;
}

export const ARCCURVE_TYPE = 'arcto';

export interface ArcCurveModel extends CellModel<ArcCurveProps> {
  type: typeof ARCCURVE_TYPE,
}

/**
 * A circular arc determined by the given control points and radius,
 * corresponding the CanvasRenderingContext2D.arcTo() method of the Canvas 2D API.
 * If starting point (x, y) are set, will begin a new sub-path.  
 * The starting point cannot be the same as the first control point
 */
export const ArcCurve: FC<ArcCurveProps> = ({
  control1,
  control2,
  ...props
}) => {
  const [cp1X = 0, cp1Y = 0] = parsePointProp(control1);
  const [cp2X = 0, cp2Y = 0] = parsePointProp(control2);
  return (
    <Cell cp1X={cp1X} cp1Y={cp1Y} cp2X={cp2X} cp2Y={cp2Y} {...props} type={ARCCURVE_TYPE} />
  )
};