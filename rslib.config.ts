import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { defineConfig } from '@rslib/core'

export default defineConfig({
	lib: [
		{
			bundle: false,
			format: 'esm', // 输出 ESM 格式
			syntax: 'es2021',
			dts: true,
			output: {
				cssModules: {
					exportLocalsConvention: 'camelCaseOnly',
				},
			},
		},
	],
	output: {
		target: 'web',
	},
	plugins: [pluginReact(), pluginSass()],
})
