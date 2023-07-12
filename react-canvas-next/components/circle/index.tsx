import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'

export interface CircleProps extends Omit<CellPropsBase, 'children' | 'x' | 'y'> {
  /**
   * The horizontal coordinate of the arc's center.
   */
  cX: number,
  /**
   * The vertical coordinate of the arc's center.
   */
  cY: number,
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
    <Cell {...props} x={props.cX + props.r} y={props.cY} type={CIRCLE_TYPE} />
  )
};
