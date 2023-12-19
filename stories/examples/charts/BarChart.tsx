import { useMemo } from 'react';
import { Canvas, Rect } from 'react-canvas-next';

export const BarChart = () => {
  const width = 500;
  const height = 400;
  const data = useMemo(() => {
    return Array(10).fill(0).map(() => Math.floor(Math.random() * (height - 10) + 10))
  }, []);
  // const space = 8;
  // const barW = (500 - (data.length - 1) * space) / data.length;
  const barW = 500 / (data.length * 2);
  const space = barW;

  return (
    <Canvas width={width} height={height} style={{boxShadow: '1px 1px 4px lightgray'}}>
      {data.map((d, i) => (
        <Rect key={d} x={i * (space + barW) + barW / 2} y={height - d} width={barW} height={d} fill={'steelblue'} />
      ))}
    </Canvas>
  )
}