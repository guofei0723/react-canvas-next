import { Meta, StoryObj } from '@storybook/react';
import { Arc, Canvas, Circle, Group, Path, Rect } from 'react-canvas-next';

const meta: Meta<typeof Path> = {
  component: Path,
  tags: ['autodocs'],
  decorators: [
    (Story, { parameters: { canvasSize, canvasViewBox }}) => {
      return (
        <Canvas width={canvasSize?.width || 400} height={canvasSize?.height || 300} viewBox={canvasViewBox}>
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
    const subpath = (
      <>
        <Arc cX={100} cY={100} r={30} startAngle={Math.PI} endAngle={Math.PI / 2} counterclockwise />
        <Arc cX={200} cY={100} r={30} startAngle={Math.PI / 2} endAngle={0} counterclockwise />
      </>
    )
    return (
      <Path {...props} subpath={subpath} />
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
      <Path {...props} subpath={<Circle cX={40} cY={35} r={35} />}>
        <Path d='M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z' fill='rgba(255, 0, 0, 0.7)' />
      </Path>
    )
  }
}

export const D: Story = {
  name: 'd - Heart',
  args: {
    fill: 'red',
    stroke: 'steelblue',
    lineWidth: 2,
    lineDash: [4, 8],
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

export const Icon: Story = {
  name: 'd - Icon',
  args: {
    lineWidth: 2,
    fill: 'red',
    d: `M145 96l66 746.6L511.8 928l299.6-85.4L878.7 96H145zm610.9 700.6l-244.1 69.6-245.2-69.6-56.7-641.2h603.8l-57.8 641.2zM281 249l1.7 24.3 22.7 253.5h206.5v-.1h112.9l-11.4 118.5L511 672.9v.2h-.8l-102.4-27.7-6.5-73.2h-91l11.3 144.7 188.6 52h1.7v-.4l187.7-51.7 1.7-16.3 21.2-242.2 3.2-24.3H511v.2H389.9l-8.2-94.2h352.1l1.7-19.5 4.8-47.2L742 249H511z`
  },
  parameters: {
    canvasSize: {
      width: 360,
      height: 360
    },
    canvasViewBox: [64, 64, 896, 896]
  }
}
