import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Group, Path, PathProps, Rect, matrix, rotate, translate } from 'react-canvas-next';
import { BarChart } from './charts/BarChart';
import { PieChart } from './charts/PieChart';

const meta: Meta= {
  title: 'examples/Charts',
  // decorators: [
  //   (Story) => {
  //     return (
  //       <Canvas width={800} height={600}>
  //         <Story />
  //       </Canvas>
  //     )
  //   }
  // ]
}

export default meta;

export const BarCharts: StoryObj = {
  render: () => {
    return <BarChart />
  }
};

export const PieCharts: StoryObj = {
  render: () => {
    return <PieChart />
  }
}