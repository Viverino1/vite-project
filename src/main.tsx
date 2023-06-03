import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './utils/redux/store.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
        <div className='font-quicksand fixed top-0 right-0 bottom-0 left-0'>
            <App />
        </div>
    </Provider>
  </React.StrictMode>,
)