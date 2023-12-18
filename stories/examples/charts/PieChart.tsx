import { useMemo } from 'react';
import { Arc, Canvas } from 'react-canvas-next'

const randomColor = () => `rgb(${[0,0,0].map(() => Math.floor(Math.random() * 256)).join(',')})`;

export const PieChart = () => {
  const width = 500;
  const height = 400;
  const data = useMemo(() => {
    return Array(10).fill(0).map(() => Math.floor(Math.random() * (height - 10) + 10))
  }, []);

  const sum = data.reduce((r, n) => r + n, 0);
  let total = 0;

  return (
    <Canvas width={width} height={height} style={{boxShadow: '1px 1px 4px lightgray'}}>
      {data.map((d, i) => {
        const pie = (
          <Arc
            key={i}
            center={[width / 2, height / 2]}
            r={height * 0.4}
            startAngle={total / sum * 2 * Math.PI}
            endAngle={(d + total) / sum * 2 * Math.PI}
            fill={randomColor()}
            stroke={'white'}
            lineWidth={2}
            sector={true}
          />
        );

        total += d;
        return pie;
      })}
    </Canvas>
  )
}