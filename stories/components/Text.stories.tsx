import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Text } from 'react-canvas-next';

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
  }
};
