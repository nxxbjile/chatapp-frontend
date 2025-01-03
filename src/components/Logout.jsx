import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }
  return (
    <div onClick={handleLogout}>Logout</div>
  )
}

export default Logout