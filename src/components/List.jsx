import React, { useContext } from 'react'
import { TbHome } from 'react-icons/tb'
import { GlobalContext } from '../contexts/Global'
import { useSocket } from '../contexts/Socket';
import axios from 'axios';

const List = ( { rooms } ) => {
    const { searchValue, setCurrRoom, currUser, currRoom, setChats, setMembers } = useContext(GlobalContext);
    const socket = useSocket();
    const handleNameLength = ( name ) => {
        if(name.length > 12){
            name = name.slice(0,12);
            return name+"...";
        }else{
            return name;
        }
    }

    const handleRoomClick =async (room) => {
        var res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/room/${room._id}`);
        setChats(res.data.room.chats);
        console.log("res of handleRoomClick : ",res)
        if(currRoom){
            socket.emit("room:leave",{roomId:currRoom._id, user:currUser.username});
        }
        setCurrRoom(room);
        console.log("Room : ", room);
        socket.emit("room:join",{roomId:res.data.room._id, user:currUser.username});
        setMembers([]);
    }

  return (
    <div className={`w-full h-full p-2`}>
        { searchValue.length > 1 ? (
            rooms.filter((room)=> room.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((room)=>(
                <div onClick={()=>handleRoomClick(room)} key={room._id} className={`w-full flex items-center justify-start rounded-lg p-2 group hover:bg-neutral-700 transition-all duration-300 ease-in-out cursor-pointer`}>
                <div className={`w-12 h-12 rounded-md bg-neutral-700 text-neutral-400 flex items-center justify-center text-3xl group-hover:bg-neutral-800  transition-all duration-300 ease-in-out`}>
                    <TbHome />
                </div>
                <div className={`text-neutral-400 font-semibold p-2 text-md transition-all duration-300 ease-in-out`}>
                    {handleNameLength(room.name)}
                </div>
            </div>
            )))  : (
                rooms.map((room)=>(
                    <div onClick={()=>handleRoomClick(room)} key={room._id} className={`w-full flex items-center justify-start rounded-lg p-2 group hover:bg-neutral-700 transition-all duration-300 ease-in-out cursor-pointer`}>
                    <div className={`w-12 h-12 rounded-md bg-neutral-700 text-neutral-400 flex items-center justify-center text-3xl group-hover:bg-neutral-800  transition-all duration-300 ease-in-out`}>
                        <TbHome />
                    </div>
                    <div className={`text-neutral-400 font-semibold p-2 text-md transition-all duration-300 ease-in-out`}>
                        {handleNameLength(room.name)}
                    </div>
                </div>
            )))
        }
    </div>
  )
}

export default List