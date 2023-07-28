import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Image } from 'react-canvas-next';

const meta: Meta<typeof Image> = {
  component: Image,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <Canvas width={600} height={500}>
          <Story />
        </Canvas>
      )
    }
  ]
}

export default meta;

type Story = StoryObj<typeof Image>;

export const Basic: Story = {
  args: {
    src: '/mk-logo.png',
    source: { x: 256, y: 256, height: 512, width: 512 },
    dest: { x: 20, y: 20, width: 200 },
  }
};
