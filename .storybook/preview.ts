import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color|fill|stroke)$/i,
        date: /Date$/,
      },
    },
  },
  argTypes: {
    fill: {
      control: {
        type: 'color',
      }
    },
    stroke: {
      control: {
        type: 'color',
      }
    },
    rotation: {
      control: {
        type: 'range',
        max: 6.28,
        min: 0,
        step: 0.01,
      },
      if: { arg: 'rotation', exists: true },
    },
    startAngle: {
      control: {
        type: 'range',
        max: 6.28,
        min: 0,
        step: 0.01,
      },
      if: { arg: 'startAngle', exists: true },
    },
    endAngle: {
      control: {
        type: 'range',
        max: 6.28,
        min: 0,
        step: 0.01,
      },
      if: { arg: 'endAngle', exists: true },
    },
  }
};

export default preview;
