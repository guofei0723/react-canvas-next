import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Canvas, CanvasProps, Circle, Group, Rect } from 'react-canvas-next';

const meta: Meta<typeof Canvas> = {
  component: Canvas,
  tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: {
  //     control: 'color',
  //   },
  // },
};

export default meta;

type Story = StoryObj<typeof Canvas>;

export const Basic: Story = {
  render: (props) => {
    return (
      <Canvas {...props} width={600} height={400}>
        <Rect x={20} y={20} width={120} height={80} fill='red' />
        <Rect x={160} y={20} width={120} height={80} fill='steelblue' />
        <Group x={160} y={40} fill='darkgoldenrod' stroke={'deeppink'} lineWidth={4}>
          <Rect width={25} height={25} />
          <Rect x={30} width={25} height={25} />
          <Rect x={10} y={10} width={25} height={25} fill='yellow' />
        </Group>
        <Circle cX={360} cY={60} r={40} fill='green' lineWidth={0} />
      </Canvas>
    )
  }
};

const rectProps = {
  x: 200,
  y: 200,
  width: 400,
  height: 400,
};

const circleProps = {
  cX: 400,
  cY: 400,
  r: 150,
};

export const ViewBox: StoryObj<React.FC<CanvasProps & { rectProps: typeof rectProps, circleProps: typeof circleProps}>> = {
  args: {
    width: 400,
    height: 400,
    viewBox: [0, 0, 800, 800],
    rectProps: {
      x: 200,
      y: 200,
      width: 400,
      height: 400,
    },
    circleProps: {
      cX: 400,
      cY: 400,
      r: 150,
    }
  },
  render: ({
    rectProps,
    circleProps,
    ...props
  }) => {
    return (
      <Canvas {...props} style={{ border: '1px solid red' }}>
        <Rect {...rectProps} fill='steelblue' />
        <Circle {...circleProps} fill='white' />
      </Canvas>
    )
  }
}

export const PreserveAspectRatio: Story = {
  args: {
    width: 400,
    height: 400,
    viewBox: [0, 0, 800, 450],
    preserveAspectRatio: true,
  },
  render: ({
    ...props
  }) => {
    const [,,viewW, viewH] = props.viewBox!;
    return (
      <Canvas {...props} style={{ border: '1px solid red' }}>
        <Rect x={0} y={0} width={viewW / 2} height={viewH / 2} fill='slategray' />
        <Rect x={viewW / 2} y={0} width={viewW / 2} height={viewH / 2} fill='red' />
        <Rect x={0} y={viewH / 2} width={viewW / 2} height={viewH / 2} fill='green' />
        <Rect x={viewW / 2} y={viewH / 2} width={viewW / 2} height={viewH / 2} fill='blue' />
        <Circle cX={viewW / 2} cY={0} r={50} fill='steelblue' />
      </Canvas>
    )
  }
};
