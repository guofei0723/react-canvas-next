/**
 * Rotate point (x, y) 180 degrees around point (cx, cy)
 */
export function rotatePi(x: number, y: number, cx: number, cy: number): [number, number] {
  return [
    2 * cx - x,
    2 * cy - y,
  ]
}

export type PointLike = {
  x: number;
  y: number;
}

export type Size = {
  width: number;
  height: number;
}

export interface Rectangle extends PointLike, Size {}

/**
 * Point prop type
 */
export type PointProp = { x: number, y: number } | [number, number];

/**
 * Parse point prop
 * @param point 
 * @returns 
 */
export function parsePointProp(point: PointProp): { x: number, y: number} {
  if (Array.isArray(point)) {
    return {
      x: point[0],
      y: point[1],
    };
  }

  return point;
}
