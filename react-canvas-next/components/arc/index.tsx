import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface ArcProps extends Omit<CellPropsBase, 'children'> {
  /**
   * The horizontal coordinate of the arc's center.
   */
  cx: number,
  /**
   * The vertical coordinate of the arc's center.
   */
  cy: number,
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
export const Arc: FC<ArcProps> = (props) => {
  return (
    <CELL_TAG {...props} type={ARC_TYPE} />
  )
};
