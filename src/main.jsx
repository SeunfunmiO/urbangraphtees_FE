import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './redux/cartSlice.js'
import wishlistReducer from './redux/wishlistSlice.js'
import orderReducer from './redux/orderSlice.js'
import settingsReducer from './redux/settingsSlice.js'
import authReducer from './redux/authSlice.js'
import notificationReducer from './redux/notificationSlice.js'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders:orderReducer,
    settings:settingsReducer,
    auth:authReducer,
    notification:notificationReducer
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,

)
