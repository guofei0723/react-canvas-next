import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'
import { PointProp, parsePointProp } from '../../utils';

export interface QuadraticCurveProps extends Omit<CellPropsBase, 'children'> {
  /**
   * The x-axis coordinate of the control point.
   */
  cpX?: number;
  /**
   * The y-axis coordinate of the control point.
   */
  cpY?: number;
  /**
   * coordinate of the control point.
   * Short form of cpX and cpY
   */
  control?: PointProp;
  /**
   * The x-axis coordinate of the end point.
   */
  endX?: number;
  /**
   * The y-axis coordinate of the end point.
   */
  endY?: number;
  /**
   * The coordinate of the end point.
   * Short form of endX and endY
   */
  end?: PointProp;
}

export const QUADRATICCURVE_TYPE = 'quadraticcurve';

export interface QuadraticCurveModel extends CellModel<QuadraticCurveProps> {
  type: typeof QUADRATICCURVE_TYPE,
}

export const QuadraticCurve: FC<QuadraticCurveProps> = ({
  control,
  end,
  ...props
}) => {
  const [cpX = 0, cpY = 0] = parsePointProp(control);
  const [endX = 0, endY = 0] = parsePointProp(end);
  return (
    <Cell cpX={cpX} cpY={cpY} endX={endX} endY={endY} {...props} type={QUADRATICCURVE_TYPE} />
  )
};