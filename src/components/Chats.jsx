import React, { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../contexts/Global';
import ChatMessage from './ChatMessage';
import { useSocket } from '../contexts/Socket';

const Chats = () => {
    const { currUser, setCurrUser, chats, setChats, currRoom } = useContext(GlobalContext);
    const socket = useSocket();
    const chatContainerRef = useRef(null); // Ref for chat container

    // Scroll to bottom when chats update
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth", // Smooth scrolling effect
            });
        }
    }, [chats]);

    // Set chats when currRoom changes
    // useEffect(() => {
    //     if (currRoom._id && currRoom.chats) {
    //         setChats(currRoom.chats);
    //     }
    // }, [currRoom, setChats]);

    // Listen for incoming messages via socket
    useEffect(() => {
        const handleMessage = (message) => {
            setChats((prevChats) => [...prevChats, message]);
        };

        socket.on("message:broadcast", handleMessage);

        // Cleanup the listener when the component unmounts
        return () => {
            socket.off("message:broadcast", handleMessage);
        };
    }, [socket, setChats]);

    return (
        <div ref={chatContainerRef} className={`w-full h-4/5 p-2 flex flex-col overflow-y-scroll pb-8`}>
            {chats && chats.length > 0 ? (
                chats.map((chat, idx) => (
                    <ChatMessage
                        key={idx}
                        sender={chat.sender}
                        message={chat.message}
                        time={chat.timestamp}
                    />
                ))
            ) : (
                <div>No chats yet</div> // Optionally display a message when no chats are available
            )}
        </div>
    );
};

export default Chats;
