import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { GlobalContext } from '../contexts/Global'
import { useSocket } from '../contexts/Socket';
import axios from 'axios';

const MessageBox = () => {
    const { isSidebarOpen, chats, setChats, currUser, formatDateTimeIST, currRoom, generateUnique12DigitNumber } = useContext(GlobalContext);
    const socket = useSocket();
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to auto
        textarea.style.height = `${textarea.scrollHeight}px`; // Adjust to scroll height
    };

    const handleInputChange = (e) => {
      setMessage(e.target.value);
    }
    const postMessage = async (data) => {
      var res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/room/${currRoom._id}/message`, data);
      console.log("post message :", res);
    }

    const handleMessageSend = () => {
      if(message.length < 1 ){
        return;
      }

      if (!currRoom || !currRoom._id) {
        console.error("Current room is invalid or not selected.");
        return;
      }
      
      if (!currUser || !currUser.username) {
        console.error("Current user is invalid.");
        return;
      }
      var date = new Date();

      var chat ={ 
        sender:currUser.username,
        message:message,
        timestamp:date, 
        _id: generateUnique12DigitNumber().toString()
      }
      postMessage(chat);
      setChats((prevChats) => [...prevChats, chat]);

      socket.emit(
        "message:new",
          { 
            roomId:currRoom._id,
            message:{
              sender:currUser.username,
              message:message,
              timestamp:date,
            }
          }
      )

      setMessage("");
    }

    useEffect(()=>{
      console.log("chats : ", chats);
    },[chats])

  return (
    <div className={`fixed bottom-0 w-full min-h-16 h-fit p-2 flex gap-2`}>
        <div className={`relative ${isSidebarOpen ? 'w-[80%]' : 'w-[80%]'} flex gap-1 rounded-lg overflow-hidden transition-all duration-300 ease-in-out`}>
            <textarea
            ref={textareaRef}
            onInput={handleInput}
            value={message}
            onChange={(e)=>handleInputChange(e)}
            className={`w-full h-full px-3 focus:outline-none resize-none placeholder:text-neutral-600 `} placeholder='message...'
            rows="1" // Start with one line
            style={{ minHeight: "2rem", maxHeight: "7rem" }} // Set min and max heights
            ></textarea>
        </div>
        <div onClick={handleMessageSend} className={`w-[20%] flex items-center justify-center bg-rose-500 rounded-lg text-white text-2xl hover:bg-rose-600 transition-all duration-300 ease-in-out cursor-pointer`}><FaPaperPlane /></div>
    </div>
  )
}

export default MessageBox