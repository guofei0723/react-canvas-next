import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { PointProp, parsePointProp } from '../../utils';

export interface ArcProps extends Omit<CellPropsBase, 'children'> {
  /**
   * The horizontal coordinate of the arc's center.
   */
  cX?: number,
  /**
   * The vertical coordinate of the arc's center.
   */
  cY?: number,
  /**
   * The coordinate of the arc's center.
   * Short form of cX and cY
   */
  center?: PointProp;
  /**
   * Arc radius
   */
  r: number;
  /**
   * The angle at which the arc starts in radians, measured from the positive x-axis.
   */
  startAngle: number,
  /**
   * The angle at which the arc ends in radians, measured from the positive x-axis.
   */
  endAngle: number,
  /**
   * An optional boolean value.
   * If true, draws the arc counter-clockwise between the start and end angles.
   * The default is false (clockwise).
   */
  counterclockwise?: boolean;
}

export const ARC_TYPE = 'arc';

export interface ArcModel extends CellModel<ArcProps> {
  type: typeof ARC_TYPE,
}

/**
 * a circular arc
 */
export const Arc: FC<ArcProps> = ({
  center,
  ...props
}) => {
  const [cX = 0, cY = 0] = parsePointProp(center);
  return (
    <Cell cX={cX} cY={cY} {...props} type={ARC_TYPE} />
  )
};
