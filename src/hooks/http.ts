import { useState,useEffect} from 'react'
import axios from 'axios'
// 封装axiso请求
import type { AxiosResponse, AxiosError, AxiosRequestConfig, AxiosInstance } from 'axios'
// 得到的数据格式
interface ResponseData<T> { 
  message: string
  code: number
  data: T | null 
}
// 请求方法
const useAxios = <T>(config:AxiosRequestConfig):ResponseData<T> =>{
  // 得到的数据
  const [data, setData] = useState<T | null>(null)
  const [message, setMessage] = useState<string>('')
  const [code, setCode] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  // 请求
  useEffect(() => {
    // 实例化axios
  const instance:AxiosInstance = axios.create({
    baseURL: '/api',
    timeout:3000
  })
  // 请求拦截器
  const requestInterceptor = instance.interceptors.request.use((config) => {
    setLoading(true)
    return config
  }, async (error: AxiosError) => {
    setLoading(false)
    return await Promise.reject(error)
  })
  // 响应拦截器
  const responseInterceptor = instance.interceptors.response.use(async (response: AxiosResponse) => { 
      setLoading(false)
      setData(response.data)
      setCode(response.status)
      return await Promise.reject(response)
    }, async (error: AxiosError) => {
      setLoading(false)
      setMessage(error.message)
      return await Promise.reject(error)
    })
    // 请求方法
    const fetch =async ():Promise<void> => {
      try {
        const {data,message,code}: ResponseData<T> = await instance(config)
        setData(data)
        setMessage(message)
        setCode(code)
      } catch (error:any) {
        // setMessage(error)
        // setMessage(codeMessage[error.status])
        setMessage(error.message)
      }
    }
    // 设置一个全局的loading 效果
    const handleLoading = (loading: boolean) => {
      const loadingRef=document.querySelector('.loading') as HTMLElement
      loadingRef.style.display=loading?'true':'false'
    }
    void fetch()
    handleLoading(loading)
    return () => {
      instance.interceptors.request.eject(requestInterceptor)
      instance.interceptors.response.eject(responseInterceptor)
    }
  }, [config])
  return {
    data,
    code,
    message
  }
}
export default useAxios