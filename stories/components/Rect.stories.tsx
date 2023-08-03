import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Rect } from 'react-canvas-next';

const meta: Meta<typeof Rect> = {
  component: Rect,
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

type Story = StoryObj<typeof Rect>;

export const Basic: Story = {
  args: {
    // x: 10,
    // y: 20,
    // width: 150,
    // height: 100,
    start: [10, 20],
    size: [150, 100],
    fill: 'steelblue',
  }
};
