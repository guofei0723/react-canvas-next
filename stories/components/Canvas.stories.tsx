import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Canvas, Circle, Group, Rect } from 'react-canvas-next';

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

const RandomRect = () => {
  const [color, setColor] = useState('blue');

  useEffect(() => {
    const timer = setInterval(() => {
      const nextColor = [0, 0, 0].map(() => Math.floor(Math.random() * 256).toString(16));
      setColor(`#${nextColor.join('')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Rect x={160} y={120} width={120} height={80} fill={color} />
  )
};

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
      <RandomRect />
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


export const PreserveAspectRatio: React.FC<any> = ({
  ...props
}) => {
  const [,,viewW, viewH] = props.viewBox;
  return (
    <Canvas {...props} style={{ border: '1px solid red' }}>
      <Rect x={0} y={0} width={viewW / 2} height={viewH / 2} fill='slategray' />
      <Rect x={viewW / 2} y={0} width={viewW / 2} height={viewH / 2} fill='red' />
      <Rect x={0} y={viewH / 2} width={viewW / 2} height={viewH / 2} fill='green' />
      <Rect x={viewW / 2} y={viewH / 2} width={viewW / 2} height={viewH / 2} fill='blue' />
      <Circle x={viewW / 2} r={50} fill='steelblue' />
    </Canvas>
  )
};
(PreserveAspectRatio as StoryObj<typeof PreserveAspectRatio>).args = {
  width: 400,
  height: 400,
  viewBox: [0, 0, 800, 450],
  preserveAspectRatio: true,
}
