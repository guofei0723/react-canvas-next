import { rotatePi } from '@/react-canvas-next/utils/math';
import { svgArcToCenterParam } from './svgArcToCenterParam';
import { Line, LineProps } from '../line';
import { BezierCurve } from '../bezier-curve';
import { QuadraticCurve } from '../quadratic-curve';
import { Ellipse } from '../ellipse';

type PointLike = { x: number, y: number }
type ParamsMapper = (params: number[], subBegin: PointLike, prevPos: PointLike) => number[];

function dXY(params: number[], prevPos: PointLike) {
  const l = params.length;
  prevPos.x += params[l - 2];
  prevPos.y += params[l - 1];
}

function copyXY(params: number[], prevPos: PointLike) {
  const l = params.length;
  prevPos.x = params[l - 2];
  prevPos.y = params[l - 1];
}

function assertLength (params: number[], l: number, d: string) {
  if (params.length !== l) {
    throw new Error(`Path command "${d}" has ${l} params, got ${params.length}: ${params.join(', ')}`)
  }
}

type CmdInfos = { cmd: string, params: number[] };
type CompInfo = { c: React.FC<any>, p: any };

/**
 * parse path d attribute
 */
export function parsePathD(d: string): CompInfo[] {
  const cmdRegEx = /([MLQTCSAZVH])([^MLQTCSAZVH]*)/ig;
  const commands = d.match(cmdRegEx);

  const paramRegEx = /([MLQTCSAZVH])|(\d+)/ig;


  // current subpath begin positiion
  const subPathBegin = { x: 0, y: 0 };
  // prev direction position
  const prevPos = { x: 0, y: 0 };
  const prevCmd = { d: '', params: [] as number[] };
  // the shape components
  const comps: Array<{ c: React.FC<any>, p: any}> = [];
  let compBeginPos: PointLike | null = null;

  const directs = commands?.map((cmd) => {
    const arr = cmd.match(paramRegEx);
    if (!arr) { return null };
    const [d, ...paramStrs] = arr;
    let params = paramStrs.map(p => parseFloat(p));
    // turn to absolute coordinates
    switch(d) {
      case 'a': {
        const l = params.length;
        params[l - 2] += prevPos.x;
        params[l - 1] += prevPos.y;
        break;
      }
      case 'h': {
        params[0] += prevPos.x;
        break;
      }
      case 'v': {
        params[0] += prevPos.y;
        break;
      }
      default: {
        for( let i = 0; d > 'a' && i < params.length; i += 2) {
          params[i] += prevPos.x;
          params[i + 1] += prevPos.y;
        }
      }
    }

    const upD = d.toUpperCase();
    prevCmd.d = upD;
    prevCmd.params = params;

    switch (upD) {
      case 'M': {
        assertLength(params, 2, d);
        copyXY(params, prevPos);
        subPathBegin.x = params[0];
        subPathBegin.y = params[1];

        compBeginPos = { ...subPathBegin };
        
        return { cmd: 'moveTo', params };
      }
      // case 'm': {
      //   assertLength(params, 2, d);
      //   dXY(params, prevPos);
      //   subPathBegin.x = prevPos.x;
      //   subPathBegin.y = prevPos.y;

      //   return { moveTo: [prevPos.x, prevPos.y] };
      // }

      case 'L': {
        assertLength(params, 2, d);
        copyXY(params, prevPos);

        const props = {
          ...compBeginPos,
          endX: prevPos.x,
          endY: prevPos.y,
        }

        comps.push({
          c: Line,
          p: props,
        });

        if (compBeginPos) {
          compBeginPos = null;
        }

        return { cmd: 'lineTo', params};
      }
      // case 'l': {
      //   assertLength(params, 2, d);
      //   dXY(params, prevPos);

      //   return { lineTo: [prevPos.x, prevPos.y] }
      // }

      case 'H': {
        assertLength(params, 1, d);
        prevPos.x = params[0];

        const props = {
          ...compBeginPos,
          endX: prevPos.x,
          endY: prevPos.y,
        }

        comps.push({
          c: Line,
          p: props,
        });

        if (compBeginPos) {
          compBeginPos = null;
        }

        return { cmd: 'lineTo', params: [prevPos.x, prevPos.y] }
      }
      // case 'h': {
      //   assertLength(params, 1, d);
      //   prevPos.x += params[0];

      //   return { lineTo: [prevPos.x, prevPos.y]}
      // }

      case 'V': {
        assertLength(params, 1, d);
        prevPos.y = params[0];

        const props = {
          ...compBeginPos,
          endX: prevPos.x,
          endY: prevPos.y,
        }

        comps.push({
          c: Line,
          p: props,
        });

        if (compBeginPos) {
          compBeginPos = null;
        }

        return { cmd: 'lineTo', params: [prevPos.x, prevPos.y] }
      }
      // case 'v': {
      //   assertLength(params, 1, d);
      //   prevPos.y += params[0];

      //   return { lineTo: [prevPos.x, prevPos.y] }
      // }

      case 'Z': {
        assertLength(params, 0, d);
        prevPos.x = subPathBegin.x;
        prevPos.y = subPathBegin.y;

        if (comps.length > 0) {
          comps[comps.length - 1].p.close = true;
        }

        return { cmd: 'closePath', params }
      }

      case 'C': {
        assertLength(params, 6, d);
        copyXY(params, prevPos);

        const [cp1X, cp1Y, cp2X, cp2Y, endX, endY] = params;
        comps.push({
          c: BezierCurve,
          p: {
            ...compBeginPos,
            cp1X, cp1Y, cp2X, cp2Y, endX, endY,
          }
        });

        if (compBeginPos) {
          compBeginPos = null;
        }

        return { cmd: 'bezierCurveTo', params };
      }

      case 'S': {
        assertLength(params, 4, d);
        if (!['c', 'C'].includes(prevCmd.d)) {
          throw new Error(`Path command "${d}" can only appear after Command "C" or "c"`)
        }
        copyXY(params, prevPos);

        const [c2x, c2y, ex, ey] = prevCmd.params.slice(2, 6);
        const cp1 = rotatePi(c2x, c2y, ex, ey);

        const [cp1X, cp1Y] = cp1;
        const [cp2X, cp2Y, endX, endY] = params;

        comps.push({
          c: BezierCurve,
          p: {
            ...compBeginPos,
            cp1X, cp1Y, cp2X, cp2Y, endX, endY,
          }
        });

        if (compBeginPos) {
          compBeginPos = null;
        }

        return { cmd: 'bezierCurveTo', params: [...cp1, ...params]};
      }

      case 'Q': {
        assertLength(params, 4, d);
        copyXY(params, prevPos);

        const [cpX, cpY, endX, endY] = params;

        comps.push({
          c: QuadraticCurve,
          p: {
            ...compBeginPos,
            cpX, cpY, endX, endY,
          }
        });

        if (compBeginPos) {
          compBeginPos = null;
        }

        return { cmd: 'quadraticCurveTo', params }
      }

      case 'T': {
        assertLength(params, 2, d);
        if (!['Q', 'q'].includes(prevCmd.d)) {
          throw new Error(`Path command "${d}" can only appear after Command "Q" or "q"`);
        }
        copyXY(params, prevPos);

        const [cpx, cpy, ex, ey] = prevCmd.params;
        const cp = rotatePi(cpx, cpy, ex, ey);

        const [cpX, cpY] = cp;
        const [endX, endY] = params;

        comps.push({
          c: QuadraticCurve,
          p: {
            ...compBeginPos,
            cpX, cpY, endX, endY,
          }
        });

        if (compBeginPos) {
          compBeginPos = null;
        }
        return { cmd: 'quadraticCurveTo', params: [...cp, ...params] };
      }

      case 'A': {
        assertLength(params, 7, d);
        const [rX, rY, angle, largeArcFlg, sweepFlag, endX, endY] = params;

        if (rX <= 0 || rY <= 0) {
          comps.push({
            c: Line,
            p: {
              ...compBeginPos,
              endX, endY,
            }
          });

          if (compBeginPos) {
            compBeginPos = null;
          }
          return { cmd: 'lineTo', params: [endX, endY] };
        }

        const rotation = angle * Math.PI / 180;

        const { cx: cX, cy: cY, startAngle, endAngle, clockwise } = svgArcToCenterParam(prevPos.x, prevPos.y, rX, rY, rotation, largeArcFlg, sweepFlag, endX, endY);
        prevPos.x = endX;
        prevPos.y = endY;

        comps.push({
          c: Ellipse,
          p: {
            ...compBeginPos,
            counterclockwise: !clockwise,
            cX, cY, rX, rY, rotation, startAngle, endAngle,
          }
        });

        if (compBeginPos) {
          compBeginPos = null;
        }

        return { cmd: 'ellipse', params: [cX, cY, rX, rY, rotation, startAngle, endAngle, !clockwise]}
      }

      default: {
        // throw new Error(`Path has no command "${d}"`)
      }
    }
  });

  return comps;
  // return directs?.filter(d => d) as CmdInfos[];
}

// const compMap = {
//   lineTo: Line,
//   bezierCurveTo: BezierCurve,
//   quadraticCurveTo: QuadraticCurve,
//   ellipse: Ellipse,
// } as const;

// export function directsToComps(directs: ReturnType<typeof parsePathD>) {
//   let prevPos: PointLike | null = null;
//   const comps: any[] = [];
  
//   directs?.forEach(d => {
//     if (d.cmd === 'moveTo') {
//       const [x, y] = d.params as number[];
//       prevPos = {
//         x,
//         y,
//       };

//       return;
//     }

//     if (d.cmd === 'closePath' && comps.length > 0) {
//       comps[comps.length - 1].props.close = true;
//       return;
//     }

//     switch (d.cmd as keyof typeof compMap) {
//       case 'lineTo': {
//         const [endX, endY] = d.params;
//         const props: LineProps = {
//           endX, endY,
//         };

//         if (prevPos) {
//           props.x = prevPos.x;
//           props.y = prevPos.y;
//           prevPos = null;
//         }
       
//         return [compMap.lineTo, props];
//       }
//     }
//   });
// }