import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AliveScope } from 'react-activation'

import App from './App'
import { persistor, store } from './store'
import './styles/index.css'
import 'reset.css'
import '@/config/language'
import 'font-awesome/css/font-awesome.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<AliveScope>
				<App />
			</AliveScope>
		</PersistGate>
	</Provider>
)
