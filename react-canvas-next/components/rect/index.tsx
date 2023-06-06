import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface RectProps extends Omit<CellPropsBase, 'children'> {
  width: number;
  height: number;
}

export const RECT_TYPE = 'rect';

export interface RectModel extends CellModel<RectProps> {
  type: typeof RECT_TYPE,
}

export const Rect: FC<RectProps> = (props) => {
  return (
    <CELL_TAG {...props} type={RECT_TYPE} />
  )
};
