'use client';

import { Canvas, Circle } from 'react-canvas-next';
import { MyCanvas } from './MyCanvas';
import { MyContext } from './my-context';

export default function RCNPage() {
  return (
    <MyContext.Provider value={{ hello: 'lightblue', world: 'steelblue' }}>
      <MyCanvas />
    </MyContext.Provider>
  )
}