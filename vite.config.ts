import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => ({
	appType: 'spa',
	base: '/solidjs-store-playground',
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
	optimizeDeps: {
		include: ['**/*.scss'], // Include all .scss files
	},
	css: {
		modules: {
			// Enable CSS Modules for all .scss files
			localsConvention: 'camelCaseOnly',
		},
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
