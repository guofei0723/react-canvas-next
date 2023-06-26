import { Meta, StoryObj } from '@storybook/react';
import { Canvas, ArcTo, Circle } from 'react-canvas-next';

const meta: Meta<typeof ArcTo> = {
  component: ArcTo,
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

type Story = StoryObj<typeof ArcTo>;

export const Basic: Story = {
  args: {
    x: 200,
    y: 20,
    cp1X: 200,
    cp1Y: 130,
    cp2X: 50,
    cp2Y: 20,
    r: 40,
    stroke: 'darkcyan',
  }
};
