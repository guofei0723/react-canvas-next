import { Meta, StoryObj } from '@storybook/react';
import { Canvas, QuadraticCurve } from 'react-canvas-next';

const meta: Meta<typeof QuadraticCurve> = {
  component: QuadraticCurve,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <Canvas width={400} height={300}>
          <Story />
        </Canvas>
      )
    }
  ]
}

export default meta;

type Story = StoryObj<typeof QuadraticCurve>;

export const Basic: Story = {
  args: {
    x: 50,
    y: 20,
    cpX: 230,
    cpY: 30,
    endX: 50,
    endY: 100,
    stroke: 'steelblue',
  }
};
