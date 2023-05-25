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
    </Canvas>
  )
}
