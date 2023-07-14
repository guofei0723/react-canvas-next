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
  if (params.length === l || (l > 0 && params.length % l === 0)) {
    return true;
  }

  console.error(new Error(`Path command "${d}" has ${l}*n arguments, got ${params.length}: ${params.join(', ')}`))
  return false;
}

type CmdInfos = { cmd: string, params: number[] };
type CompInfo = { c: React.FC<any>, p: any };

/**
 * parse path d attribute
 */
export function parsePathD(d: string): CompInfo[] {
  const cmdRegEx = /([MLQTCSAZVH])([^MLQTCSAZVH]*)/ig;
  const commands = d.match(cmdRegEx);

  const paramRegEx = /([MLQTCSAZVH])|(\-?\d+)/ig;

  const parsedCmds: any[] = [];

  // 解析命令
  commands?.forEach(cmd => {
    const arr = cmd.match(paramRegEx);
    if (!arr) { 
      console.error(new Error(`Path can not recognize command: ${cmd}`));
      return;
     };

    const [d, ...paramStrs] = arr;
    let params: number[] = [];
    try {
      params = paramStrs.map(p => parseFloat(p));
    } catch (e) {
      console.error(`Parsing command arguments failed: ${cmd}`);
      console.error(e);

      return;
    }

    let valid = false;
    let paramsLength = -1;

    switch(d.toUpperCase()) {
      case 'M': {
        valid = assertLength(params, 2, d);
        paramsLength = 2;
        break;
      }

      case 'L': {
        valid = assertLength(params, 2, d);
        paramsLength = 2;
        break;
      }

      case 'H': {
        valid = assertLength(params, 1, d);
        paramsLength = 1;
        break;
      }

      case 'V': {
        valid = assertLength(params, 1, d);
        paramsLength = 1;
        break;
      }

      case 'Z': {
        valid = assertLength(params, 0, d);
        paramsLength = 0;
        break;
      }

      case 'C': {
        valid = assertLength(params, 6, d);
        paramsLength = 6;
        break;
      }

      case 'S': {
        valid = assertLength(params, 4, d);
        paramsLength = 4;
        break;
      }

      case 'Q': {
        valid = assertLength(params, 4, d);
        paramsLength = 4;
        break;
      }

      case 'T': {
        valid = assertLength(params, 2, d);
        paramsLength = 2;
        break;
      }

      case 'A': {
        valid = assertLength(params, 7, d);
        paramsLength = 7;
        break;
      }
    }

    if (valid) {
      if (paramsLength === 0) {
        parsedCmds.push([d]);
      } else if (paramsLength > 0) {
        for (let i = 0; i < params.length; i += paramsLength) {
          parsedCmds.push([d, ...params.slice(i, i + paramsLength)]);
        }
      }
    }
  });

  // current subpath begin positiion
  const subPathBegin = { x: 0, y: 0 };
  // prev direction position
  const prevPos = { x: 0, y: 0 };
  let prevCmd = { d: '', params: [] as number[] };
  let currCmd = { d: '', params: [] as number[] };
  // the shape components
  const comps: Array<{ c: React.FC<any>, p: any}> = [];
  let compBeginPos: PointLike | null = null;

  parsedCmds.forEach((cmd) => {
    // const arr = cmd.match(paramRegEx);
    // if (!arr) { return null };
    const [d, ...params] = cmd;
    // let params = paramStrs.map(p => parseFloat(p));
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
    let valid = true;
    let convertedParams: number[] | null = null;

    switch (upD) {
      case 'M': {
        copyXY(params, prevPos);
        subPathBegin.x = params[0];
        subPathBegin.y = params[1];

        compBeginPos = { ...subPathBegin };
        
        // return { cmd: 'moveTo', params };
        break;
      }

      case 'L': {
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

        // return { cmd: 'lineTo', params};
        break;
      }

      case 'H': {
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

        // return { cmd: 'lineTo', params: [prevPos.x, prevPos.y] }
        break;
      }

      case 'V': {
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

        // return { cmd: 'lineTo', params: [prevPos.x, prevPos.y] }
        break;
      }

      case 'Z': {
        prevPos.x = subPathBegin.x;
        prevPos.y = subPathBegin.y;

        if (comps.length > 0) {
          comps[comps.length - 1].p.close = true;
        }

        // return { cmd: 'closePath', params }
        break;
      }

      case 'C': {
        copyXY(params, prevPos);

        const [cp1X, cp1Y, cp2X, cp2Y, endX, endY] = params;
        comps.push({
          c: BezierCurve,
          p: {
            ...compBeginPos,
            cp1X, cp1Y, cp2X, cp2Y, endX, endY,
          }
        });

        // return { cmd: 'bezierCurveTo', params };
        break;
      }

      case 'S': {
        if (!['c', 'C', 's', 'S'].includes(prevCmd.d)) {
          valid = false;
          console.error(new Error(`Path command "${d}" can only appear after Command "C" or "c"`))
        } else {
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

          convertedParams = [cp1X, cp1Y, cp2X, cp2Y, endX, endY];
        }

        // return { cmd: 'bezierCurveTo', params: [...cp1, ...params]};
        break;
      }

      case 'Q': {
        copyXY(params, prevPos);

        const [cpX, cpY, endX, endY] = params;

        comps.push({
          c: QuadraticCurve,
          p: {
            ...compBeginPos,
            cpX, cpY, endX, endY,
          }
        });

        // return { cmd: 'quadraticCurveTo', params }
        break;
      }

      case 'T': {
        if (!['Q', 'q', 'T', 't'].includes(prevCmd.d)) {
          valid = false;
          console.error(new Error(`Path command "${d}" can only appear after Command "Q" or "q"`));
        } else {
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
  
          convertedParams = [cpX, cpY, endX, endY];
        }
        // return { cmd: 'quadraticCurveTo', params: [...cp, ...params] };
        break;
      }

      case 'A': {
        const [rX, rY, angle, largeArcFlg, sweepFlag, endX, endY] = params;

        if (rX <= 0 || rY <= 0) {
          comps.push({
            c: Line,
            p: {
              ...compBeginPos,
              endX, endY,
            }
          });
          // return { cmd: 'lineTo', params: [endX, endY] };
        } else {
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
  
          // return { cmd: 'ellipse', params: [cX, cY, rX, rY, rotation, startAngle, endAngle, !clockwise]}
        }

        break;
      }

      default: {
        // throw new Error(`Path has no command "${d}"`)
      }
    }

    if (valid) {
      if (upD !== 'M') {
        compBeginPos = null;
      }

      prevCmd = {
        d: upD,
        params: convertedParams || params,
      }
    }

    convertedParams = null;

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