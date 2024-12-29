import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/Global'

const ChatHeader = ({ roomName, members }) => {
  const { toggleRightbar } = useContext(GlobalContext); 
    
  return (
    <div className={`w-full flex items-center justify-start h-12 p-3 bg-[#28282B] border-b border-gray-600`}>
        <div className={`flex flex-col items-start justify-start`}>
            <div onClick={toggleRightbar} className={`text-xl max-sm:text-lg font-semibold text-rose-500 cursor-pointer`}>{ roomName }</div>
            <div className={` text-neutral-500 text-sm `}>{members}</div>
        </div>
    </div>
  )
}

export default ChatHeader