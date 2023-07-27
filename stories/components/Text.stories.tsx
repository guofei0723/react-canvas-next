import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Circle, Group, Rect, Text } from 'react-canvas-next';

const meta: Meta<typeof Text> = {
  component: Text,
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

type Story = StoryObj<typeof Text>;

export const Basic: Story = {
  args: {
    text: 'Hello World',
    fill: 'steelblue',
    textBaseline: 'top',
  }
};

// export const AsClip: Story = {
//   args: {
//     text: 'Hello World',
//     fill: 'steelblue',
//     asClip: true,
//     font: '68px sans-serif',
//     textBaseline: 'top',
//   },
//   render: (props) => (
//     <Group>
//       <Rect x={0} y={0} width={80} height={280} fill={'green'} />
//       <Text {...props}>
//         <Circle cX={200} cY={200} r={200} fill={'red'} />
//       </Text>
//       <Rect x={100} y={100} width={80} height={80} fill={'lightsalmon'} />
//     </Group>
//   )
// }