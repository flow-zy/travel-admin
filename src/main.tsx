import ReactDOM from 'react-dom/client'
import { Provider  } from 'react-redux'
import App from './App.tsx'
import { store } from './store'
import './index.css'
import 'reset.css'
import '@/mock'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}><App /></Provider>
    
)