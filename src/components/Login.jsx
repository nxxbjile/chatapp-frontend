import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    }
  return (
    <div onClick={handleLogin}>Login</div>
  )
}

export default Login