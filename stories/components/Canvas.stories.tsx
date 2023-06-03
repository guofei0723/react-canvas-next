import { Group, Rect } from '@/react-canvas-next/components';
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
      <Rect x={20} y={20} width={120} height={80} fill='red' />
      <Rect x={160} y={20} width={120} height={80} fill='steelblue' />
      <Group x={160} y={40} fill='darkgoldenrod' stroke={'deeppink'} lineWidth={4}>
        <Rect width={25} height={25} />
        <Rect x={30} width={25} height={25} />
        <Rect x={10} y={10} width={25} height={25} fill='yellow' />
      </Group>
      <Rect x={20} y={120} width={120} height={80} fill='green' lineWidth={0} />
    </Canvas>
  )
}
