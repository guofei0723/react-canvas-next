import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { SizeProp, parseSizeProp } from '../../utils';

export interface RectProps extends Omit<CellPropsBase, 'children'> {
  width?: number;
  height?: number;
  size?: SizeProp;
}

export const RECT_TYPE = 'rect';

export interface RectModel extends CellModel<RectProps> {
  type: typeof RECT_TYPE,
}

export const Rect: FC<RectProps> = ({
  size,
  ...props
}) => {
  const [width = 0, height = 0] = parseSizeProp(size);
  return (
    <Cell width={width} height={height} {...props} type={RECT_TYPE} />
  )
};
