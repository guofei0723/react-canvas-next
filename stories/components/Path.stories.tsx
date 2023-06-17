import { Meta, StoryObj } from '@storybook/react';
import { Arc, Canvas, Circle, Path } from 'react-canvas-next';

const meta: Meta<typeof Path> = {
  component: Path,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <Canvas>
          <Story />
        </Canvas>
      )
    }
  ]
};

export default meta;

type Story = StoryObj<typeof Path>;

export const Basic: Story = {
  render: () => {
    return (
      <Path fill={'red'} stroke={'yellow'} lineWidth={4}>
        <Arc x={100} y={100} r={30} startAngle={Math.PI} endAngle={Math.PI / 2} counterclockwise />
        <Arc x={200} y={100} r={30} startAngle={Math.PI / 2} endAngle={0} counterclockwise />
      </Path>
    )
  }
};