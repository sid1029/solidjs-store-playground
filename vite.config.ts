import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => ({
	appType: 'spa',
	base: mode === 'production' ? '/solidjs-store-playground' : '/',
	build: {
		target: 'esnext',
		rollupOptions: {
			output: {
				manualChunks: {
					'faker-js': ['@faker-js/faker/locale/en_US'],
				},
			},
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
	resolve: {
		alias: {
			'@': '/src',
		},
	},
}));
