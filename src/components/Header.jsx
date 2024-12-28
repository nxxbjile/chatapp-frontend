import React, { useContext, useState } from 'react'
import { GlobalContext } from '../contexts/Global'
import CurrentUser from './CurrentUser';
import axios from 'axios';

const Header = () => {

    const { toggleSidebar, setCreateRoomVisible, createRoomVisible, baseUrl, currUser } = useContext(GlobalContext);
    const [inputVal, setInputVal] = useState("");

    const handleChange = (e) => {
      setInputVal(e.target.value);
    }

    const createRoom = async () => {
      if(inputVal.length < 2){
        return;
      }

      var res = await axios.post(`${baseUrl}/room/create`, {
        name:inputVal,
        createdBy:currUser.username,
      })

      console.log("Room creation : ", res);
      setInputVal("");
    }

    const handleCreateRoom = () => {
      createRoom();
    }

  return (
    <div className={`fixed top-0 left-0 z-10 w-full h-12 flex items-center justify-between bg-[#28282B] p-2 border-b border-gray-600 select-none`}>
        <div onClick={toggleSidebar} className={`text-2xl font-semibold text-rose-500`}>ChatApp</div>
        {
          createRoomVisible &&
          <div className={`fixed top-0 left-0 z-40 w-screen h-screen flex items-center justify-center backdrop-blur-md transition-all duration-300 ease-in-out`}>
            <div className={`max-w-1/4 min-w-[420px] p-2 h-2/5 rounded-lg bg-[#28282B] flex flex-col justify-between items-center `}>
              <div className={`w-full`}>
                <input onChange={(e)=>handleChange(e)} value={inputVal} type="text" placeholder="room name" className={`w-full rounded-md p-2 px-3 placeholder:text-neutral-400 bg-neutral-700 focus:outline-none text-neutral-400`} />
              </div>
              <div onClick={handleCreateRoom} className={`flex items-center justify-center w-full h-10 rounded-md mb-6 bg-rose-500 text-white font-medium p-2 cursor-pointer`}>
                create room
              </div>
            </div>
          </div>

        }
        <CurrentUser />
    </div>
  )
}

export default Header