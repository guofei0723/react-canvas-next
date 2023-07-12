import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { parsePathD } from './parser';

export interface PathProps extends CellPropsBase {
  /**
   * path d
   */
  d?: string;
  /**
   * as a cliping path
   */
  asClip?: boolean;
}

export const PATH_TYPE = 'path';

export interface PathModel extends CellModel<PathProps> {
  type: typeof PATH_TYPE,
}

export const Path: FC<PathProps> = ({
  d,
  children,
  ...props
}) => {
  const comps = d ? parsePathD(d) : null;
  const nodes = comps?.map(({ c: Comp, p: compProps }, i) => (<Comp key={i} {...compProps} />))

  return (
    <Cell {...props} type={PATH_TYPE}>
      {nodes || children}
    </Cell>
  )
};
