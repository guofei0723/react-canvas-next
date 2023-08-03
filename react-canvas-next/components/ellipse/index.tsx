import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { PointProp, parsePointProp } from '../../utils';

export interface EllipseProps extends Omit<CellPropsBase, 'children'> {
  /**
   * The x-axis (horizontal) coordinate of the ellipse's center.
   */
  cX?: number;
  /**
   * The y-axis (vertical) coordinate of the ellipse's center.
   */
  cY?: number;
  /**
   * The coordinate of the arc's center.
   * Short form of cX and cY
   */
  center?: PointProp;
  /**
   * The ellipse's major-axis radius. Must be non-negative.
   */
  rX?: number;
  /**
   * The ellipse's minor-axis radius. Must be non-negative.
   */
  rY?: number;
  /**
   * The ellipse's radius. Must be non-negative.
   * short form of rX and rY
   */
  radius?: PointProp;
  /**
   * The rotation of the ellipse, expressed in radians.
   */
  rotation?: number;
  /**
   * The eccentric angle at which the ellipse starts,
   * measured clockwise from the positive x-axis and expressed in radians.
   */
  startAngle: number;
  /**
   * The eccentric angle at which the ellipse ends,
   * measured clockwise from the positive x-axis and expressed in radians.
   */
  endAngle: number;
  /**
   * An optional boolean value which, if true, draws the ellipse counterclockwise (anticlockwise).
   * The default value is false (clockwise).
   */
  counterclockwise?: boolean;
}

export const ELLIPSE_TYPE = 'ellipse';

export interface EllipseModel extends CellModel<EllipseProps> {
  type: typeof ELLIPSE_TYPE,
}

export const Ellipse: FC<EllipseProps> = ({
  center,
  radius,
  ...props
}) => {
  const [cX = 0, cY = 0] = parsePointProp(center);
  const [rX = 10, rY = 10] = parsePointProp(radius);
  return (
    <Cell cX={cX} cY={cY} rX={rX} rY={rY} rotation={0} {...props} type={ELLIPSE_TYPE} />
  )
};
