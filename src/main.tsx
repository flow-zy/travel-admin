import ReactDOM from 'react-dom/client'
import { Provider  } from 'react-redux'
import App from './App.tsx'
import { persistor, store } from './store'
import {PersistGate } from 'redux-persist/integration/react'
import './index.css'
import 'reset.css'
import '@/mock'
import 'font-awesome/css/font-awesome.min.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>,

)
