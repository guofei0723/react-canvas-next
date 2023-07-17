import { FC, ReactNode } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { parsePathD } from './parser';
import { SubPath } from './sub-path';

export interface PathProps extends CellPropsBase {
  /**
   * svg path d
   */
  d?: string;
  /**
   * path sub shapes, will overwrite prop d
   */
  subpath?: ReactNode;
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
  subpath,
  children,
  ...props
}) => {
  const comps = d && !subpath ? parsePathD(d) : null;
  const nodes = comps?.map(({ c: Comp, p: compProps }, i) => (<Comp key={i} {...compProps} />));

  return (
    <Cell {...props} type={PATH_TYPE}>
      <SubPath asClip={props.asClip} fillRule={props.fillRule}>
        {nodes}
        {subpath}
      </SubPath>
      {children}
    </Cell>
  )
};
