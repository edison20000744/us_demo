import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import { visualizer } from 'rollup-plugin-visualizer';
import Preview from 'vite-plugin-vue-component-preview';

export default [
	Preview(),
	Vue({
		template: {
			compilerOptions: {
				// treat all tags with a dash as custom elements
				isCustomElement: (tag) => ['lottie-player'].includes(tag)
			}
		}
	}),
	Pages({ extensions: ['vue', 'js', 'ts'] }),
	Layouts(),
	visualizer({
		open: true,
		gzipSize: true,
		brotliSize: true,
	}),
];