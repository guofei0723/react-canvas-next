import { Meta, StoryObj } from '@storybook/react';
import { Arc, Canvas, Circle, Group, Path, Rect } from 'react-canvas-next';

const meta: Meta<typeof Path> = {
  component: Path,
  tags: ['autodocs'],
  decorators: [
    (Story, { parameters: { canvasSize, canvasViewBox }}) => {
      return (
        <Canvas width={canvasSize?.width} height={canvasSize?.height} viewBox={canvasViewBox}>
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
    fill: 'steelblue',
  },
  render: (props) => {
    return (
      <Group>
        <Path {...props}>
          {/* <Arc cX={100} cY={100} r={30} startAngle={Math.PI} endAngle={Math.PI / 2} counterclockwise />
          <Arc cX={200} cY={100} r={30} startAngle={Math.PI / 2} endAngle={0} counterclockwise /> */}
          <Circle cX={40} cY={35} r={35} />
        </Path>
        <Path d='M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z' fill='rgba(255, 0, 0, 0.7)' />
        {/* <Rect width={800} height={500} fill={'papayawhip'} /> */}
      </Group>
    )
  }
}

export const D: Story = {
  name: 'd - Heart',
  args: {
    fill: 'red',
    d: `M 10,30
    A 20,20 0,0,1 50,30
    A 20,20 0,0,1 90,30
    Q 90,60 50,90
    Q 10,60 10,30 z`
  }
}

export const DC: Story = {
  name: 'd - cubic Bézier',
  args: {
    lineWidth: 2,
    stroke: 'red',
    d: `M100,200 C100,100 400,100 400,200
    M100,500 C25,400 475,400 400,500
    M100,800 C175,700 325,700 400,800
    M600,200 C675,100 975,100 900,200
    M600,500 C600,350 900,650 900,500
    M600,800 C625,700 725,700 750,800 S875,900 900,800
    `
  },
  parameters: {
    canvasSize: {
      width: 500,
      height: 500
    },
    canvasViewBox: [0, 0, 1000, 1000]
  }
}

export const DQ: Story = {
  name: 'd - quadratic Bézier',
  args: {
    lineWidth: 2,
    stroke: 'red',
    d: `M200,300 Q400,50 600,300 T1000,300`
  },
  parameters: {
    canvasSize: {
      width: 500,
      height: 500
    },
    canvasViewBox: [0, 0, 1000, 1000]
  }
}

export const DA: Story = {
  name: 'd - elliptical arc',
  args: {
    lineWidth: 2,
    stroke: 'red',
    d: `M300,200 h-150 a150,150 0 1,0 150,-150 z
M275,175 v-150 a150,150 0 0,0 -150,150 z
M600,350 l 50,-25
  a25,25 -30 0,1 50,-25 l 50,-25
  a25,50 -30 0,1 50,-25 l 50,-25
  a25,75 -30 0,1 50,-25 l 50,-25
  a25,100 -30 0,1 50,-25 l 50,-25`
  },
  parameters: {
    canvasSize: {
      width: 500,
      height: 500
    },
    canvasViewBox: [0, 0, 1000, 1000]
  }
}