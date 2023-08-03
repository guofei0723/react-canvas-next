import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { PointProp, parsePointProp } from '../../utils';

export interface LineProps extends Omit<CellPropsBase, 'children' | 'fill' | 'fillRule' | 'close'> {
  /**
   * The x-axis coordinate of the line's end point.
   */
  endX?: number;
  /**
   * The y-axis coordinate of the line's end point.
   */
  endY?: number;
  /**
   * The coordinate of the line's end point.
   * Short form of endX and endY
   */
  end?: PointProp;
}

export const LINE_TYPE = 'line';

export interface LineModel extends CellModel<LineProps> {
  type: typeof LINE_TYPE,
}

export const Line: FC<LineProps> = ({
  end,
  ...props
}) => {
  const [endX = 0, endY = 0] = parsePointProp(end);
  return (
    <Cell endX={endX} endY={endY} {...props} type={LINE_TYPE} />
  )
};