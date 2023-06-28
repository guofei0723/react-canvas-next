import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Line } from 'react-canvas-next';

const meta: Meta<typeof Line> = {
  component: Line,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['fill'],
    }
  },
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

type Story = StoryObj<typeof Line>;

export const Basic: Story = {
  args: {
    x: 30,
    y: 50,
    endX: 150,
    endY: 100,
    stroke: 'steelblue',
  }
};
