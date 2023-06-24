import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface CircleProps extends Omit<CellPropsBase, 'children'> {
  /**
   * The horizontal coordinate of the arc's center.
   */
  cx: number,
  /**
   * The vertical coordinate of the arc's center.
   */
  cy: number,
  /**
   * circle radius
   */
  r: number;
}

export const CIRCLE_TYPE = 'circle';

export interface CircleModel extends CellModel<CircleProps> {
  type: typeof CIRCLE_TYPE,
}

export const Circle: FC<CircleProps> = (props) => {
  return (
    <CELL_TAG {...props} type={CIRCLE_TYPE} />
  )
};
