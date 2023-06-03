import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface GroupProps extends CellPropsBase {}

export interface GroupModel extends CellModel<GroupProps> {
  type: 'group',
}

export const Group: FC<GroupProps> = (props) => {
  return (
    <CELL_TAG {...props} type='group' />
  )
};
