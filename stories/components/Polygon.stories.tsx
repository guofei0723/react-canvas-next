import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Polygon } from 'react-canvas-next';

const meta: Meta<typeof Polygon> = {
  component: Polygon,
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

type Story = StoryObj<typeof Polygon>;

export const Basic: Story = {
  args: {
    points: [
      100, 100,
      150, 25,
      150, 75,
      200, 0,
    ],
    fill: 'steelblue',
  }
};
