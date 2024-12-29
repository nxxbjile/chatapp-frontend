import React, { useContext, useEffect, useState } from 'react'
import RoomInfo from './RoomInfo'
import Participents from './Participents'
import { GlobalContext } from '../contexts/Global';
import { useSocket } from '../contexts/Socket';
import { FaPlus } from 'react-icons/fa6';

const Righbar = () => {
  const { currRoom, members, setMembers, toggleRightbar, rightbarOpen } = useContext(GlobalContext);
  const [total, setTotal] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    const handleMembers = (data) => {
      setMembers(data);
      setTotal(members.length);
      console.log("members : ", members);
    };

    // Attach socket listener
    socket.on("members", handleMembers);

    // Cleanup to avoid memory leaks
    return () => {
      socket.off("members", handleMembers);
    };
  }, [socket]); //

  useEffect(()=> {
    if(currRoom){
      socket.emit("members:get", {room:currRoom._id})
    }
  },[currRoom, socket])

  useEffect(()=>{
    const handleNewUser = (user) => {
      if(!members.includes(user)){
        setMembers((prev)=> [...prev, user]);
      }
    }
    socket.on("newUser", handleNewUser);

    return () => {
      socket.off("newUser", handleNewUser);
    }
  },[socket, currRoom])

  useEffect(()=>{
    const handleUserLeft = (user) => {
      if(members.includes(user)){
        var newMembers = members.filter((user)=> user !== user);
        setMembers(newMembers);
      }
      socket.on("room:left", handleUserLeft);

      return () => {
        socket.off("room:left", handleUserLeft);
      }
    }
  },[socket])
  return (
    <div className={`fixed top-12 max-sm:w-full w-1/4 ${rightbarOpen ? 'right-0' : '-right-full'} transition-all duration-300 ease-in-out h-full bg-[#28282B] overflow-y-scroll p-2`}>
      <div onClick={toggleRightbar} className={`absolute top-6 cursor-pointer right-6 bg-neutral-700 text-neutral-400 p-4 text-2xl rounded-full flex items-center justify-center rotate-45`}><FaPlus /></div>
      <RoomInfo name={currRoom.name} total_members={total} />
      <Participents data={members}  />
    </div>
  )
}

export default Righbar