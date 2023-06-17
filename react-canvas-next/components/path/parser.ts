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
    throw new Error(`Path command "${d}" has ${l} params, got ${params.length}:`)
  }
}

/**
 * parse path d attribute
 */
export function parsePathD(d: string) {
  const cmdRegEx = /([MLQTCSAZVH])([^MLQTCSAZVH]*)/ig;
  const commands = d.match(cmdRegEx);

  const paramRegEx = /([MLQTCSAZVH])|(\d+)/ig;


  // current subpath begin positiion
  const subPathBegin = { x: 0, y: 0 };
  // prev direction position
  const prevPos = { x: 0, y: 0 };

  const directs = commands?.map((cmd) => {
    const arr = cmd.match(paramRegEx);
    if (!arr) { return null };
    const [d, ...paramStrs] = arr;
    const params = paramStrs.map(p => parseFloat(p));

    switch (d) {
      case 'M': {
        assertLength(params, 2, d);
        copyXY(params, prevPos);
        subPathBegin.x = params[0];
        subPathBegin.y = params[1];
        
        return { moveTo: params };
      }
      case 'm': {
        assertLength(params, 2, d);
        dXY(params, prevPos);
        subPathBegin.x = prevPos.x;
        subPathBegin.y = prevPos.y;

        return { moveTo: [prevPos.x, prevPos.y] };
      }

      case 'L': {
        assertLength(params, 2, d);
        copyXY(params, prevPos);

        return { lineTo: params};
      }
      case 'l': {
        assertLength(params, 2, d);
        dXY(params, prevPos);

        return { lineTo: [prevPos.x, prevPos.y] }
      }

      case 'H': {
        assertLength(params, 1, d);
        prevPos.x = params[0];

        return { lineTo: [prevPos.x, prevPos.y] }
      }
      case 'h': {
        assertLength(params, 1, d);
        prevPos.x += params[0];

        return { lineTo: [prevPos.x, prevPos.y]}
      }

      case 'V': {
        assertLength(params, 1, d);
        prevPos.y = params[0];

        return { lineTo: [prevPos.x, prevPos.y] }
      }
      case 'v': {
        assertLength(params, 1, d);
        prevPos.y += params[0];

        return { lineTo: [prevPos.x, prevPos.y] }
      }

      case 'Z':
      case 'z': {
        assertLength(params, 0, d);
        prevPos.x = subPathBegin.x;
        prevPos.y = subPathBegin.y;

        return { closePath: params }
      }

      default: {
        // throw new Error(`Path has no command "${d}"`)
      }
    }
  });


  console.log('commands:', directs);
}