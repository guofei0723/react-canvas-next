import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface EllipseProps extends Omit<CellPropsBase, 'children'> {
  /**
   * The x-axis (horizontal) coordinate of the ellipse's center.
   */
  cx: number;
  /**
   * The y-axis (vertical) coordinate of the ellipse's center.
   */
  cy: number;
  /**
   * The ellipse's major-axis radius. Must be non-negative.
   */
  rx: number;
  /**
   * The ellipse's minor-axis radius. Must be non-negative.
   */
  ry: number;
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

export const Ellipse: FC<EllipseProps> = (props) => {
  return (
    <CELL_TAG rotation={0} {...props} type={ELLIPSE_TYPE} />
  )
};
