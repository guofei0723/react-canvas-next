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

export type PairNumbers = [number, number];
export type FourNumbers = [number, number, number, number];

export type Rectangle = (PointLike & Size);

export type RectangleProp = Rectangle | FourNumbers;

/**
 * Point prop type
 */
export type PointProp = PointLike | PairNumbers;
export type SizeProp = Size | PairNumbers;

/**
 * Parse point prop
 * @param point 
 * @returns 
 */
export function parsePointProp(point?: PointProp): PairNumbers | [] {
  if (!point) { return []; }
  if (Array.isArray(point)) {
    return point;
  }

  const { x, y } = point;
  return [x, y];
}

/**
 * Parse size prop
 * @param size
 * @returns 
 */
export function parseSizeProp(size?: SizeProp): PairNumbers | [] {
  if (!size) { return []; }
  if (Array.isArray(size)) {
    return size;
  }

  const { width, height } = size;
  return [width, height];
}

/**
 * Parse rectangle prop
 * @param rectangle 
 * @returns 
 */
export function parseRectangleProp(rectangle?: RectangleProp): FourNumbers | [] {
  if (!rectangle) { return []; }
  if (Array.isArray(rectangle)) {
    return rectangle;
  }

  const { x, y, width, height } = rectangle;
  return [x, y, width, height];
}