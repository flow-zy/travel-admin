import { type IUser } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {setToken} from '@/utils/token'
interface UserState extends IUser {
  [key:string]:any
}

const initialState: UserState = {
  username: '',
  password: '',
}

export const useSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser | null>) {
      const data = action.payload as IUser
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'token') {
          setToken(value)
          delete data[key]
        }
        state[key] = value
      })
    },
  },
})

export const { login } = useSlice.actions

export default useSlice.reducer
