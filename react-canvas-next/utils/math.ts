/**
 * Rotate point (x, y) 180 degrees around point (cx, cy)
 */
export function rotatePi(x: number, y: number, cx: number, cy: number): [number, number] {
  return [
    2 * cx - x,
    2 * cy - y,
  ]
}
