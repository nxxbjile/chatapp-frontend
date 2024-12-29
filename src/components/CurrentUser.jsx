import React, { useContext, useEffect, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { GlobalContext } from '../contexts/Global'
import Login from './Login';
import Logout from './Logout';

const CurrentUser = () => {
  const { currUser, setCurrUser} = useContext(GlobalContext);

  const getUser = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    return user;
  }
  useEffect(()=>{
    var user = getUser();
    if(user){
      setCurrUser(user);
    }
  },[])
  return (
    <>
      <div className={`flex gap-3 items-center justify-start px-6`}>
        <div className={`w-8 h-8 rounded-full bg-neutral-600 text-neutral-400 flex items-center justify-center`}><FaUserLarge /></div>
        <div className={`max-sm:text-sm text-neutral-300`}>{currUser ? currUser.username : ""}</div>
        <div className={`p-1 px-3 max-sm:text-sm cursor-pointer font-medium bg-rose-500 text-white text-lg rounded-lg`}>{currUser ? ( <Logout />) : <Login /> }</div>
      </div>
    </>
  )
}

export default CurrentUser