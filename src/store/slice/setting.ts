import { createSlice } from '@reduxjs/toolkit'
import type { ThemeConfig } from 'antd'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ISetting {
	language?: string
	theme?: ThemeConfig
	componentSize?: 'small' | 'middle' | 'large'
	collapse?: boolean
	[key: string]: any
}
const initialState: ISetting = {
	theme: {
		token: {
			colorPrimaryBg: '#cfe0f5',
			colorPrimary: '#03edf9'
		}
	},
	componentSize: 'middle',
	language: '',
	collapse: false
}

export const setting = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		save(state, action: PayloadAction<ISetting | null>) {
			const payload = action.payload
			state.theme = { ...payload.theme }
			state.componentSize = payload.componentSize
		},
		setLanguage(state, { payload }: PayloadAction<string>) {
			state.language = payload
		},
		setIsCollapsed(state, { payload }: PayloadAction<boolean>) {
			state.collapse = payload
		}
	}
})
export const { save, setLanguage, setIsCollapsed } = setting.actions

export default setting.reducer
