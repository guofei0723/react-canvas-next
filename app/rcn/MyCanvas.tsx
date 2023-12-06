import { useContext } from 'react'
import { Canvas, Circle } from 'react-canvas-next'
import { MyContext } from './my-context'
import { MyRect } from './MyRect';

export const MyCanvas: React.FC = () => {
  const c = useContext(MyContext);
  return (
    <Canvas width={600} height={400}>
      <Circle r={20} fill={c.hello} center={[200, 200]} />
      <MyRect />
    </Canvas>
  )
}