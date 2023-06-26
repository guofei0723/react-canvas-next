import { FC, useMemo } from 'react'
import { CELL_TAG, CellModel, CellPropsBase } from '../base'

export interface PolygonModelProps extends Omit<CellPropsBase, 'children'> {
  /**
   * This attribute defines the list of points (pairs of x,y absolute coordinates) required to draw the polygon
   *   
   * eg:  
   * [  
   *   x1, y1,  
   *   x2, y2,  
   *   ...  
   * ]
   */
  points: number[];
}

export const POLYGON_TYPE = 'polygon';

export interface PolygonModel extends CellModel<PolygonModelProps> {
  type: typeof POLYGON_TYPE,
}

export interface PolygonProps extends Omit<PolygonModelProps, 'x' | 'y'> {}

/**
 * A shape consisting of a set of connected straight line segments
 */
export const Polygon: FC<PolygonProps> = (props) => {
  const { points } = props;
  const otherPoints = useMemo(() => points.slice(2), [points]);
  return (
    <CELL_TAG {...props} x={points[0]} y={points[1]} points={otherPoints} type={POLYGON_TYPE} />
  )
};
