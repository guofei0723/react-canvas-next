import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface ArcProps extends Omit<CellPropsBase, 'children'> {
  /**
   * The angle at which the arc starts in radians, measured from the positive x-axis.
   */
  startAngle: number,
  /**
   * The angle at which the arc ends in radians, measured from the positive x-axis.
   */
  endAngle: number,
  /**
   * Arc radius
   */
  r: number;
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

export const Arc: FC<ArcProps> = (props) => {
  return (
    <CELL_TAG {...props} type={ARC_TYPE} />
  )
};
