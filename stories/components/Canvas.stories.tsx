import { Meta } from '@storybook/react';
import { Canvas } from 'react-canvas-next';

const meta: Meta<typeof Canvas> = {
  component: Canvas,
  tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: {
  //     control: 'color',
  //   },
  // },
};

export default meta;

export const Basic = () => {
  return (
    <Canvas>
      <rcnRect x={20} y={20} width={120} height={80} fill='red' />
      <rcnRect x={160} y={20} width={120} height={80} fill='steelblue' />
    </Canvas>
  )
}
