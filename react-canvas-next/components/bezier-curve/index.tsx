import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { PointProp, parsePointProp } from '../../utils';

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
   * The x-axis coordinate of the end point.
   */
  endX?: number;
  /**
   * The y-axis coordinate of the end point.
   */
  endY?: number;
  /**
   * The coordinate of the end point.
   */
  end?: PointProp;
}

export const BEZIERCURVE_TYPE = 'beziercurve';

export interface BezierCurveModel extends CellModel<BezierCurveProps> {
  type: typeof BEZIERCURVE_TYPE,
}

export const BezierCurve: FC<BezierCurveProps> = ({
  control1,
  control2,
  end,
  ...props
}) => {
  const [cp1X = 0, cp1Y = 0] = parsePointProp(control1);
  const [cp2X = 0, cp2Y = 0] = parsePointProp(control2);
  const [endX = 0, endY = 0] = parsePointProp(end);
  return (
    <Cell
      cp1X={cp1X}
      cp1Y={cp1Y}
      cp2X={cp2X}
      cp2Y={cp2Y}
      endX={endX}
      endY={endY}
      {...props}
      type={BEZIERCURVE_TYPE}
    />
  )
};