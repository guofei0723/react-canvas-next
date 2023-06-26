import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Circle } from 'react-canvas-next';

const meta: Meta<typeof Circle> = {
  component: Circle,
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

type Story = StoryObj<typeof Circle>;

export const Basic: Story = {
  args: {
    cX: 200,
    cY: 150,
    r: 50,
    fill: 'steelblue',
  }
};
