import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface RectProps extends Omit<CellPropsBase, 'children'> {
  width: number;
  height: number;
}

export interface RectModel extends CellModel<RectProps> {
  type: 'rect',
}

export const Rect: FC<RectProps> = (props) => {
  return (
    <CELL_TAG {...props} type='rect' />
  )
};
