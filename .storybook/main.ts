import type { StorybookConfig } from "@storybook/nextjs";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: "tag",
  },
  webpackFinal(config, options) {
    if (!config.resolve) {
      config.resolve = {
        plugins: [],
      };
    }

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin(),
    ];

    return config;
  },
};
export default config;
