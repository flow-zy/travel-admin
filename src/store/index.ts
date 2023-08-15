import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {persistReducer,persistStore} from 'redux-persist'
import userReducer from './slice/user'
import storage from 'redux-persist/es/storage'
import thunk from 'redux-thunk'
// persist配置
const config={
  key:'root',
  storage,
  blackList:[] // 不被缓存的
}
// 拆分reducer
const reducer = combineReducers({
    user: userReducer,
})
// 
const reducers=persistReducer(config,reducer)
export const store = configureStore({
  reducer:reducers,
  middleware:[thunk ]
})

export const  persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
