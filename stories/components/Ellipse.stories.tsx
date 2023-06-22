import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Ellipse } from 'react-canvas-next';

const meta: Meta<typeof Ellipse> = {
  component: Ellipse,
  tags: ['autodocs'],
  argTypes: {
    rotation: {
      control: {
        type: 'range',
        max: 6.28,
        min: 0,
        step: 0.01,
      }
    },
    startAngle: {
      control: {
        type: 'range',
        max: 6.28,
        min: 0,
        step: 0.01,
      }
    },
    endAngle: {
      control: {
        type: 'range',
        max: 6.28,
        min: 0,
        step: 0.01,
      }
    },
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

type Story = StoryObj<typeof Ellipse>;

export const Basic: Story = {
  args: {
    x: 200,
    y: 150,
    rx: 150,
    ry: 80,
    rotation: Math.PI / 4,
    startAngle: 0,
    endAngle: 1.6 * Math.PI,
    fill: 'palegoldenrod',
  }
};
