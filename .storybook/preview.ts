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
  }
};

export default preview;
