import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	build: {
		target: 'esnext',
		rollupOptions: {
			output: {
				manualChunks: {
					'faker-js': ['@faker-js/faker/locale/en_US']
				},
			},
		}
	},
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/styles/variables";',
			},
		},
	},
	plugins: [solid()],
});
