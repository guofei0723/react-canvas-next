import { FC } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'
import { parsePathD } from './parser';

export interface PathProps extends CellPropsBase {
  /**
   * path d
   */
  d?: string;
}

export const PATH_TYPE = 'path';

export interface PathModel extends CellModel<PathProps> {
  type: typeof PATH_TYPE,
}

export const Path: FC<PathProps> = (props) => {
  if (props.d) {
    console.log('path d:', parsePathD(props.d));
  }
  return (
    <CELL_TAG {...props} type={PATH_TYPE} />
  )
};
