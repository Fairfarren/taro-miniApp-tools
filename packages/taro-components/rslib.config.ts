import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm', // 输出 ESM 格式
      syntax: 'es2021',
      dts: true
    },
  ],
  output: {
    target: 'web',
  },
  source: {
    entry: {
      index: './src/index.tsx', // 你的入口文件
    },
  },
  plugins: [pluginReact()],
});
