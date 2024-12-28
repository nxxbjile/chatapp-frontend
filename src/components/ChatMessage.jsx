import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/Global'

const ChatMessage = ({ sender, message, time}) => {

    const { currUser: user, formatDateTimeIST } = useContext(GlobalContext);

  return (
    <div className={` ${sender === user.username ? 'self-end' : 'self-start'} max-w-3/4 w-2/4 h-fit my-1 `}>
        <div className={`w-full h-fit rounded-md ${sender === user.username ? 'bg-rose-500' : 'bg-neutral-800'}  p-2 flex flex-col`}>
            <div className={`w-full h-4 text-xs ${sender === user.username ? 'text-white' : 'text-neutral-400'}`}>
                @{sender}
            </div>
            <div className={`w-full h-fit ${sender === user.username ? 'text-white' : 'text-neutral-400'} py-2`}>
                {message}
            </div>
            {
                // sender !== user.username && 
                <div className={`flex items-center justify-end ${sender === user.username ? 'text-white' : 'text-neutral-500'}  text-sm`}>
                    {formatDateTimeIST(time)}
                </div>
            }
        </div>
    </div>
  )
}

export default ChatMessage