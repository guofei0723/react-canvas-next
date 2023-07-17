import { FC, ReactNode } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface SubPathProps {
  asClip?: boolean;
  fillRule?: CanvasFillRule;
  children?: ReactNode;
}

export const SUBPATH_TYPE = 'subpath';

export interface SubPathModel extends CellModel<SubPathProps> {
  type: typeof SUBPATH_TYPE,
}

export const SubPath: FC<SubPathProps> = (props) => {
  return (
    <CELL_TAG {...props} type={SUBPATH_TYPE} />
  )
};