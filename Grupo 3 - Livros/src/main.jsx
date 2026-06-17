import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LivroProvider from './components/provider/LivroProvider.jsx'
import UsuarioProvider from './components/provider/UsuarioProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LivroProvider>
      <UsuarioProvider>
        <App />
      </UsuarioProvider>
    </LivroProvider>
  </StrictMode>,
)
