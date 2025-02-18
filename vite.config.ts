import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
	return {
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
		appType: 'spa',
		base: mode === 'production' ? '/solidjs-store-playground/' : '/',
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
		plugins: [solid()]
	};
});
