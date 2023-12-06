import { useContext } from 'react'
import { Rect } from 'react-canvas-next'
import { MyContext } from './my-context'

export const MyRect = () => {
  const c = useContext(MyContext);
  return (
    <Rect fill={c.world} width={200} height={100} x={50} y={50} />
  )
}