import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface ClipProps extends CellPropsBase {
  // to add props
}

export const CLIPPATH_TYPE = 'clipPath';

export interface ClipPathModel extends CellModel<ClipProps> {
  type: typeof CLIPPATH_TYPE,
}

export const ClipPath: FC<ClipProps> = (props) => {
  return (
    <CELL_TAG {...props} type={CLIPPATH_TYPE} />
  )
};
