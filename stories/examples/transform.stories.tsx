import { Meta, StoryObj } from '@storybook/react';
import { Canvas, Group, Path, PathProps, Rect, matrix, rotate, translate } from 'react-canvas-next';

const meta: Meta= {
  title: 'examples/Transform',
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

export const Basic: StoryObj<typeof Path> = {
  args: {
    transform: [
      translate(100, 20),
      rotate(Math.PI / 180 * 30),
    ]
  },
  render: ({ transform }) => {
    return (
      <Path
        d='M 0 0 L 200 0 L 0 150 Z'
        fill={'steelblue'}
        transform={transform}
      />
    )
  },

  parameters: {
    controls: {
      include: ['transform'],
    }
  }
}


export const UseGroup: StoryObj<typeof Path> = {
  parameters: {
    controls: {
      include: ['transform'],
    }
  },

  args: {
    transform: [
      translate(-150, -120),
      // rotate(Math.PI / 180 * 30),
    ]
  },

  render: ({ transform }) => {
    return (
      <Group
        transform={[translate(200, 150), rotate(Math.PI / 180 * 90)]}
      >
        <Path
          d='M 0 0 L 200 0 L 150 120 L 100 150 L 50 120 Z'
          fill={'steelblue'}
          transform={transform}
        />
        <Path d='M-30 0 L 30 0 M 0 -30 L 0 30' stroke={'red'} />
      </Group>
    )
  }
}


export const Matrix: StoryObj = {
  parameters: {
    controls: {
      include: ['transform'],
    }
  },

  args: {
    transform: [],
  },

  render: () => {
    const angles = Array(12).fill(0).map((_, i) => [Math.PI / 6 * i, Math.floor(255 / 12 * i)]);

    return (
      <>
        <Group transform={translate(100, 100)}>
          {angles.map(([angle, color], i) => {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return (
              <Rect
                key={angle}
                fill={`rgb(${color}, ${color}, ${color})`}
                size={[100, 10]}
                transform={matrix(cos, sin, -sin, cos, 0, 0)}
              />
            )
          })}
        </Group>
        <Rect
          fill='rgba(255, 128, 255, 0.5)'
          start={[0, 50]}
          size={[100, 100]}
          transform={matrix(-1, 0, 0, 1, 100, 100)}
        />
      </>
    )
  }
}