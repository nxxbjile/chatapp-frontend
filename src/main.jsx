import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import { Global } from './contexts/Global'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { SocketProvider } from './contexts/Socket'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home />,
  },
  {
    path:"/signup",
    element:<Signup />
  },
  {
    path:"/login",
    element:<Login />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Global>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </Global>
  </StrictMode>,
)
