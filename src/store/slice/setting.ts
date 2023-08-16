import { createSlice } from '@reduxjs/toolkit'
import type { ThemeConfig } from 'antd'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface ISetting {
  theme?: ThemeConfig
  componentSize?: 'small' | 'middle' | 'large' | undefined
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
}

export const setting = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    save(state, action: PayloadAction<ISetting | null>) {
      const payload = action.payload as ISetting
      Object.entries(payload).forEach(([key, value]) => {
        state[key] = value
      })
    }
  }
})
export const { save } = setting.actions

export default setting.reducer