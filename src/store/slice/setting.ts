  import { createSlice } from '@reduxjs/toolkit'
  import type{ThemeConfig} from 'antd'
import type { PayloadAction } from '@reduxjs/toolkit'
interface ISetting{
  theme:ThemeConfig
  componentSize:string
}
const initialState:ISetting = {
 theme:{
  token:{
    colorPrimaryBg:'#1377ff',
    colorPrimary:'transparent'
  }
 },
 componentSize:'middle',
}

export const setting =createSlice({
  name:'setting',
  initialState,
  reducers:{
    save(state,{payload}:PayloadAction){
              Object.entries(payload).forEach(([key,value])=>{
                state[key]=value
              })
    }
  }
})
export const { save } = setting.actions

export default setting.reducer