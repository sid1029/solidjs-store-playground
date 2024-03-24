import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	build: {
		target: 'esnext',
	},
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/styles/variables";'
			}
		}
	},
	plugins: [solid()],
});
