import React, { useContext, useState } from 'react'
import { GlobalContext } from '../contexts/Global';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';

const CreateRoom = ({ visible, onClick }) => {
    const { baseUrl, currUser } = useContext(GlobalContext);
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
        <>
            {
                visible &&
            <div className={`fixed top-0 left-0 z-40 w-full h-full p-2 flex items-center justify-center backdrop-blur-md transition-all duration-300 ease-in-out`}>
                <div className={`max-w-2/4 p-2 h-2/5 border-2 border-gray-700 rounded-lg bg-[#28282B] flex flex-col justify-between items-center `}>
                    <div className={`relative w-full`}>
                    <div onClick={onClick} className={`absolute -top-20 -right-4 p-4 rounded-full bg-neutral-600 text-neutral-300  rotate-45 text-2xl cursor-pointer `}><FaPlus /></div>
                        <input onChange={(e) => handleChange(e)} value={inputVal} type="text" placeholder="room name" className={`w-full rounded-md p-2 px-3 placeholder:text-neutral-400 bg-neutral-700 focus:outline-none text-neutral-400`} />
                    </div>
                    <div onClick={handleCreateRoom} className={`flex items-center justify-center w-full h-10 rounded-md mb-6 bg-rose-500 text-white font-medium p-2 cursor-pointer`}>
                        create room
                    </div>
                </div>
            </div>
            }       
        </>
    )
}

export default CreateRoom