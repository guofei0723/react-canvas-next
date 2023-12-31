import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'

export interface GroupProps extends CellPropsBase {}

export const GROUP_TYPE = 'group';

export interface GroupModel extends CellModel<GroupProps> {
  type: typeof GROUP_TYPE,
}

export const Group: FC<GroupProps> = (props) => {
  return (
    <Cell {...props} type={GROUP_TYPE} />
  )
};
