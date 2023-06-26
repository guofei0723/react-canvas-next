import { Meta, StoryObj } from '@storybook/react';
import { Canvas, BezierCurve } from 'react-canvas-next';

const meta: Meta<typeof BezierCurve> = {
  component: BezierCurve,
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

type Story = StoryObj<typeof BezierCurve>;

export const Basic: Story = {
  args: {
    x: 50,
    y: 20,
    cp1X: 230,
    cp1Y: 30,
    cp2X: 150,
    cp2Y: 80,
    endX: 250, 
    endY: 100,
    fill: 'transparent',
    stroke: 'steelblue',
    lineWidth: 2,
  }
};
