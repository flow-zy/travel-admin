import { defineConfig, UserConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
	const { VITE_APP_PROXY, VITE_APP_BASEURL, VITE_APP_PORT, ENV } = loadEnv(
		mode,
		process.cwd(),
		''
	)
	return {
		plugins: [
			react(),
			// @ts-ignore
			visualizer()
		],
		base: ENV === 'development' ? './' : '/travel-admin/',
		server: {
			port: Number(VITE_APP_PORT),
			open: false,
			proxy: {
				VITE_APP_BASEURL: {
					target: VITE_APP_PROXY,
					ws: true,
					changeOrigin: true,
					rewrite(path) {
						// rewrite
						path = path.replace(new RegExp(`^${VITE_APP_BASEURL}`), '')
						return path
					}
				}
			}
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
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		}
	}
})
