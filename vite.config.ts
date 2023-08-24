import { defineConfig, UserConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import ViteCdnImport from 'vite-plugin-cdn-import'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
	const env = loadEnv(mode, process.cwd(), '')
	return {
		plugins: [
			react(),
			// @ts-ignore
			visualizer(),
			ViteCdnImport({
				modules: [
					{
						name: 'react',
						var: 'react',
						path: 'https://unpkg.com/react@18.2.0/umd/react.production.min.js'
					},
					{
						name: 'react-dom',
						var: 'react-dom',
						path: 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js'
					},
					{
						name: 'react-router-dom',
						var: 'react-router-dom',
						path: 'https://unpkg.com/react-router-dom@6.15.0/dist/umd/react-router-dom.production.min.js'
					},
					{
						name: 'antd',
						var: 'antd',
						path: 'https://unpkg.com/antd@5.8.4/dist/antd.min.js'
					},
					{
						name: 'axios',
						var: 'axios',
						path: 'https://unpkg.com/axios@1.4.0/dist/axios.min.js'
					},
					{
						name: 'react-redux',
						var: 'react-redux',
						path: 'https://unpkg.com/react-redux@8.1.2/dist/react-redux.js'
					},
					{
						name: 'mockjs',
						var: 'mockjs',
						path: 'https://unpkg.com/mockjs@1.1.0/dist/mock.js'
					},
					{
						name: 'moment',
						var: 'moment',
						path: 'https://unpkg.com/moment@2.29.4/moment.js'
					}
				]
			})
		],
		base: env.NODE_ENV === 'development' ? './' : '/travel-admin/',
		server: {
			port: Number(env.VITE_APP_PORT),
			open: false
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		build: {
			minify: 'esbuild',
			// 构建后是否生成 source map 文件(用于线上报错代码报错映射对应代码)
			sourcemap: false,
			// 指定输出路径（相对于 项目根目录)
			outDir: 'dist',
			// 启用/禁用 gzip 压缩大小报告 - 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
			reportCompressedSize: false,
			// chunk 大小警告的限制（以 kbs 为单位）
			chunkSizeWarningLimit: 2000,
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return id
								.toString()
								.split('node_modules/')[1]
								.split('/')[0]
								.toString()
						}
					}
				}
			}
		}
	}
})
