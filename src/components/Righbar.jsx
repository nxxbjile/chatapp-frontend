import React, { useContext, useEffect, useState } from 'react'
import RoomInfo from './RoomInfo'
import Participents from './Participents'
import { GlobalContext } from '../contexts/Global';
import { useSocket } from '../contexts/Socket';

const Righbar = () => {
  const { currRoom, members, setMembers } = useContext(GlobalContext);
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
    <div className={`fixed top-12 right-0 w-1/4 h-full bg-[#28282B] overflow-y-scroll p-2`}>
      <RoomInfo name={currRoom.name} total_members={total} />
      <Participents data={members}  />
    </div>
  )
}

export default Righbar