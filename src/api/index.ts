import type { AxiosRequestConfig } from 'axios'

import request, { type ResponseData } from '@/utils/http'

export const login = async <T>(
	config: AxiosRequestConfig
): Promise<ResponseData<T>> => await request(config)
export const userAll = async <T>(
	config: AxiosRequestConfig
): Promise<ResponseData<T>> => await request(config)
// 修改用户状态
export const editStatus = async <T>(
	config: AxiosRequestConfig
): Promise<ResponseData<T>> => await request(config)
