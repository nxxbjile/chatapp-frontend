import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/Global'
import { TbHomePlus } from 'react-icons/tb';
import Search from './Search';
import List from './List';
import axios from 'axios';

const Sidebar = () => {
  const { isSidebarOpen, baseUrl, rooms, setRooms, setCreateRoomVisible, toggleCreateRoom } = useContext(GlobalContext);

  const getRooms = async () => {
    var res = await axios.get(`${baseUrl}/room/allrooms`);
    setRooms(res.data.rooms);
    console.log("rooms response", res);
  }


  useEffect(()=>{
    getRooms();
  },[]);

  const handleCreateRoom = () => {
    toggleCreateRoom();
  }

  return (
    <div className={`fixed z-30 top-12 w-1/4 h-full overflow-y-scroll bg-[#28282B] ${isSidebarOpen ? 'left-0' : '-left-1/4'} transition-all duration-300 ease-in-out`}>
        <div className={`flex items-center justify-center p-3`}>
            <div onClick={handleCreateRoom} className={`w-36 h-36 border border-neutral-600 rounded-md text-neutral-600 flex items-center justify-center text-7xl cursor-pointer`}><TbHomePlus /></div>
        </div>
        <div className={`pb-12`}>
            <Search />
            <List rooms={rooms} />
        </div>
    </div>
  )
}

export default Sidebar