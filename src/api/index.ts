import request, {type ResponseData} from '@/utils/http'
import type {AxiosRequestConfig} from 'axios'
export const login = async<T>(config:AxiosRequestConfig):Promise<ResponseData<T>> => await request(config)
export const userAll= async<T>(config:AxiosRequestConfig):Promise<ResponseData<T>> => await request(config)