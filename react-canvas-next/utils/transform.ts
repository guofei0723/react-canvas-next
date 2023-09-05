export type TranslateDirect = ['translate', number, number];

export function translate(x: number, y: number): TranslateDirect {
  return ['translate', x, y];
}

export type RotateDirect = ['rotate', number];
export function rotate(angle: number): RotateDirect {
  return ['rotate', angle];
}

export type ScaleDirect = ['scale', number, number];
export function scale(x: number, y?: number): ScaleDirect {
  return ['scale', x, y ?? x];
}

export type TransformMatrixDirect = ['matrix', number, number, number, number, number, number];
export function matrix(scaleX: number, skewY: number, skewX: number, scaleY: number, moveX: number, moveY: number): TransformMatrixDirect {
  return ['matrix', scaleX, skewY, skewX, scaleY, moveX, moveY];
}
