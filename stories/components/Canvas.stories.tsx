import { Meta, StoryObj } from '@storybook/react';
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

export const Basic = () => {
  return (
    <Canvas width={800} height={600}>
      <Rect x={20} y={20} width={120} height={80} fill='red' />
      <Rect x={160} y={20} width={120} height={80} fill='steelblue' />
      <Group x={160} y={40} fill='darkgoldenrod' stroke={'deeppink'} lineWidth={4}>
        <Rect width={25} height={25} />
        <Rect x={30} width={25} height={25} />
        <Rect x={10} y={10} width={25} height={25} fill='yellow' />
      </Group>
      <Rect x={20} y={120} width={120} height={80} fill='green' lineWidth={0} />
    </Canvas>
  )
}

export const ViewBox: React.FC<any> = ({
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

(ViewBox as StoryObj<typeof ViewBox>).args = {
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
    x: 400,
    y: 400,
    r: 150,
  }
}