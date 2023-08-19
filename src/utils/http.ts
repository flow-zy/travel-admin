import axios, {
	type AxiosError,
	type AxiosRequestConfig,
	type AxiosResponse,
	type AxiosInstance
} from 'axios'
import NProgress from '@/config/nprogress'
export interface ResponseData<T> {
	message: string
	code: number
	data: T | null
}

const fetchData = async <T>(
	config: AxiosRequestConfig
): Promise<ResponseData<T>> => {
	const instance: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_BASE,
		timeout: 3000
	})

	let requestInterceptor: number | undefined
	let responseInterceptor: number | undefined

	try {
		// 请求拦截器
		requestInterceptor = instance.interceptors.request.use(
			requestConfig =>
				// 可以在发送请求前进行一些操作，如添加认证信息等
				{
					NProgress.start()
					return requestConfig
				},
			async (error: AxiosError) => {
				NProgress.done()
				// 请求出错时的处理逻辑
				return await Promise.reject(error)
			}
		)

		// 响应拦截器
		responseInterceptor = instance.interceptors.response.use(
			(response: AxiosResponse<ResponseData<T>>) =>
				// 可以在收到响应后进行一些操作，如处理错误码，转换返回数据等
				{
					NProgress.done()
					return response
				},
			async (error: AxiosError) => {
				NProgress.done()
				// 响应出错时的处理逻辑
				return await Promise.reject(error)
			}
		)

		// 发送请求
		const response: AxiosResponse<ResponseData<T>> = await instance(config)

		return response.data
	} catch (error) {
		// 发生错误时的处理逻辑
		return await Promise.reject(error)
	} finally {
		// 清除拦截器
		if (requestInterceptor != null) {
			instance.interceptors.request.eject(requestInterceptor)
		}
		if (responseInterceptor != null) {
			instance.interceptors.response.eject(responseInterceptor)
		}
	}
}

export default fetchData
