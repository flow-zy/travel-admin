import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { type IUser } from '@/types'
import { setToken, removeToken } from '@/utils/token'

interface UserState extends IUser {}
const initialState: UserState = {
	username: '',
	password: ''
}

export const useSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action: PayloadAction<IUser | null>) {
			const data = action.payload as IUser
			Object.entries(data).forEach(([key, value]) => {
				if (key === 'token') {
					setToken(value as string)
					delete data[key]
				}
				state[key] = value
			})
		},
		logout(state) {
			const loading = document.querySelector('.loading') as HTMLElement
			loading.style.display = 'block'
			// let newState=state
			Object.keys(state).forEach(key => {
				if (['username', 'password'].includes(key)) {
					delete state[key]
				} else {
					state[key] = ''
				}
			})
			setTimeout(() => {
				removeToken()
				location.reload()
				loading.style.display = 'none'
			}, 3000)
		}
	}
})

export const { login, logout } = useSlice.actions

export default useSlice.reducer
