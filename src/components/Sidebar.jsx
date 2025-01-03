import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/Global'
import { TbHomePlus } from 'react-icons/tb';
import Search from './Search';
import List from './List';
import axios from 'axios';
import CreateRoom from './CreateRoom';

const Sidebar = () => {
  const { isSidebarOpen, baseUrl, rooms, setRooms, toggleCreateRoom, createRoomVisible } = useContext(GlobalContext);

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
    <div className={`fixed z-30 top-12 max-sm:w-full min-sm:w-1/4 h-full overflow-y-scroll bg-[#28282B] ${isSidebarOpen ? 'left-0' : '-left-full max-sm:-w-full'} transition-all duration-300 ease-in-out`}>
      <CreateRoom visible={createRoomVisible} onClick={toggleCreateRoom} />
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