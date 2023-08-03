import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { PointProp, parsePointProp } from '../../utils';

export interface CircleProps extends Omit<CellPropsBase, 'children' | 'x' | 'y' | 'start'> {
  /**
   * The horizontal coordinate of the arc's center.
   */
  cX?: number,
  /**
   * The vertical coordinate of the arc's center.
   */
  cY?: number,
  /**
   * The coordinate of the arc's center.
   * Short form of cX and cY
   */
  center?: PointProp;
  /**
   * circle radius
   */
  r: number;
}

export const CIRCLE_TYPE = 'circle';

type CircleModelProps = Required<Omit<CircleProps, 'center'>>;

export interface CircleModel extends CellModel<CircleModelProps> {
  type: typeof CIRCLE_TYPE,
}

export const Circle: FC<CircleProps> = ({
  center,
  ...props
}) => {
  const [x = 0, y = 0] = parsePointProp(center);
  const { cX = x, cY = y} = props;

  return (
    <Cell {...props} cX={cX} cY={cY} x={cX + props.r} y={cY} type={CIRCLE_TYPE} />
  )
};
