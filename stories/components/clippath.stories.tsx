import { Meta, StoryObj } from '@storybook/react';
import { Arc, Canvas, Circle, ClipPath, Path, Rect } from 'react-canvas-next';

const meta: Meta = {
  component: ClipPath,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <Canvas  width={800} height={500}>
          <Story />
        </Canvas>
      )
    }
  ]
};

export default meta;

type Story = StoryObj<typeof ClipPath>;
export const Basic: Story = {
  render: () => {
    return (
      <>
        <ClipPath>
          <Arc x={100} y={100} r={30} startAngle={Math.PI} endAngle={Math.PI / 2} counterclockwise />
          <Arc x={200} y={100} r={30} startAngle={Math.PI / 2} endAngle={0} counterclockwise />
        </ClipPath>
        {/* <Path d='M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z' /> */}
        <Rect width={800} height={500} fill={'papayawhip'} />
      </>
    )
  }
};
