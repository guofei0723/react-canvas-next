import { FC } from 'react'
import { Cell, CellModel, CellPropsBase } from '../base'

export interface QuadraticCurveProps extends Omit<CellPropsBase, 'children'> {
  /**
   * The x-axis coordinate of the control point.
   */
  cpX: number;
  /**
   * The y-axis coordinate of the control point.
   */
  cpY: number;
  /**
   * The x-axis coordinate of the end point.
   */
  endX: number;
  /**
   * The y-axis coordinate of the end point.
   */
  endY: number;
}

export const QUADRATICCURVE_TYPE = 'quadraticcurve';

export interface QuadraticCurveModel extends CellModel<QuadraticCurveProps> {
  type: typeof QUADRATICCURVE_TYPE,
}

export const QuadraticCurve: FC<QuadraticCurveProps> = (props) => {
  return (
    <Cell {...props} type={QUADRATICCURVE_TYPE} />
  )
};