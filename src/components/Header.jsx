import React, { useContext, useState } from 'react'
import { GlobalContext } from '../contexts/Global'
import CurrentUser from './CurrentUser';
import axios from 'axios';
import CreateRoom from './CreateRoom';

const Header = () => {

  const { toggleSidebar, setCreateRoomVisible, createRoomVisible, } = useContext(GlobalContext);

  return (
    <div className={`fixed top-0 left-0 z-10 w-full h-12 flex items-center justify-between bg-[#28282B] p-2 border-b border-gray-600 select-none`}>
        <div onClick={toggleSidebar} className={`max-sm:text-lg text-2xl font-semibold text-rose-500 cursor-pointer`}>ChatApp</div>
        {/* <CreateRoom visible={createRoomVisible} /> */}
        <CurrentUser />
    </div>
  )
}

export default Header