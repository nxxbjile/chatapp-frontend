import React from 'react'

const ChatHeader = ({ roomName, members }) => {
    
  return (
    <div className={`w-full flex items-center justify-start h-12 p-3 bg-[#28282B] border-b border-gray-600`}>
        <div className={`flex flex-col items-start justify-start`}>
            <div className={`text-xl font-semibold text-rose-500`}>{ roomName }</div>
            <div className={` text-neutral-500 text-sm `}>{members}</div>
        </div>
    </div>
  )
}

export default ChatHeader