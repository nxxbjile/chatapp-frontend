import React, { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../contexts/Global';
import ChatHeader from './ChatHeader';
import MessageBox from './MessageBox';
import Chats from './Chats';

const ChatArea = () => {
  const { isSidebarOpen, currRoom, rightbarOpen } = useContext(GlobalContext);
  const chatAreaRef = useRef(null);

  // Scroll to the bottom of the chat area when messages are updated
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [currRoom?.messages]);

  return (
    <div
      ref={chatAreaRef}
      className={`${
        isSidebarOpen ? 'w-full' : 'left-0 w-full'
      } fixed top-12 h-screen overflow-y-scroll bg-neutral-700 transition-all duration-300 ease-in-out`}
    >
      <ChatHeader roomName={currRoom?.name || 'Select a Room'} />
      <Chats />
      <MessageBox />
    </div>
  );
};

export default ChatArea;
