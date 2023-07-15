export function parseDtoCmd(d: string) {
  const cmdNames = 'MLQTCSAZVH';
  const cmds: Array<any> = [];

  let tempCmd: Array<any> | null = null;
  let tempParam: string | null = null;

  const finishCurrentParam = () => {
    if (tempCmd && tempParam) {
      tempCmd.push(parseFloat(tempParam));
    }

    tempParam = null;
  }

  const finishCurrentCmd = () => {
    finishCurrentParam();
    if (tempCmd) {
      cmds.push(tempCmd);
      tempCmd = null;
    }
  }

  for (let i = 0; i < d.length; i += 1) {
    const char = d[i];
    const upperChar = char.toUpperCase();

    // 一个命令的开始
    if (cmdNames.includes(upperChar)) {
      finishCurrentCmd();
      tempCmd = [char];
      continue;
    }

    const code = char.charCodeAt(0);
    // 数字0-9
    const isNumber = (48 <= code && code <= 57);
    const isDot = char === '.';

    // 一个参数的开始
    if (char === '-' || ((isDot || isNumber) && !tempParam) || (isDot && tempParam?.includes('.'))) {
      finishCurrentParam();
      tempParam = char;

      // 判断椭圆指令的两个flag
      if (tempCmd?.[0]?.toUpperCase() === 'A' && isNumber) {
        const recentParamLength = (tempCmd?.slice(1).length || 0) % 7;
        // 新开始的数字是flag
        if (recentParamLength === 4 || recentParamLength === 3) {
          finishCurrentParam();
        }
      }
      continue;
    }

    if (isNumber || isDot) {
      tempParam += char;
      continue;
    }

    finishCurrentParam();
  }

  finishCurrentCmd();

  return cmds;
}
