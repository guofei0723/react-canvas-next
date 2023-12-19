import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Arc } from 'react-canvas-next';

const meta: Meta<typeof Arc> = {
  component: Arc,
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

type Story = StoryObj<typeof Arc>;

export const Basic: Story = {
  args: {
    // cX: 200,
    // cY: 150,
    center: [200, 100],
    r: 50,
    startAngle: 0,
    endAngle: 5, // Math.PI * x
    fill: 'steelblue',
    lineCap: 'round',
    lineJoin: 'round',
    sector: true,
  }
};
