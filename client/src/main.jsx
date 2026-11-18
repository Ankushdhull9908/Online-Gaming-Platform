import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ShopProvider } from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <ShopProvider>
    <ThemeProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </ThemeProvider>
    </ShopProvider>
    </BrowserRouter>
  ,
)
