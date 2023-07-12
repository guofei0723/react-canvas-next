import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'

export interface LineProps extends Omit<CellPropsBase, 'children' | 'fill' | 'fillRule' | 'close'> {
  /**
   * The x-axis coordinate of the line's end point.
   */
  endX: number;
  /**
   * The y-axis coordinate of the line's end point.
   */
  endY: number;
}

export const LINE_TYPE = 'line';

export interface LineModel extends CellModel<LineProps> {
  type: typeof LINE_TYPE,
}

export const Line: FC<LineProps> = (props) => {
  return (
    <Cell {...props} type={LINE_TYPE} />
  )
};