import { Meta, StoryObj } from '@storybook/react';
import { Arc, Canvas, Circle, Group, Path, Rect } from 'react-canvas-next';

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
  args: {
    fill: 'red',
    stroke: 'yellow',
    lineWidth: 4,
  },
  render: (props) => {
    return (
      <Path {...props}>
        <Arc cX={100} cY={100} r={30} startAngle={Math.PI} endAngle={Math.PI / 2} counterclockwise />
        <Arc cX={200} cY={100} r={30} startAngle={Math.PI / 2} endAngle={0} counterclockwise />
      </Path>
    )
  }
};

export const ClipPath: Story = {
  args: {
    asClip: true,
  },
  render: (props) => {
    return (
      <Group>
        <Path {...props}>
          <Arc cX={100} cY={100} r={30} startAngle={Math.PI} endAngle={Math.PI / 2} counterclockwise />
          <Arc cX={200} cY={100} r={30} startAngle={Math.PI / 2} endAngle={0} counterclockwise />
        </Path>
        {/* <Path d='M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z' /> */}
        <Rect width={800} height={500} fill={'papayawhip'} />
      </Group>
    )
  }
}

export const D: Story = {
  args: {
    d: `M 10,30
    A 20,20 0,0,1 50,30
    A 20,20 0,0,1 90,30
    Q 90,60 50,90
    Q 10,60 10,30 z`
  }
}