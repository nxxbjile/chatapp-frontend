import React from 'react'
import { FaUserLarge } from 'react-icons/fa6'
const UserCards = ({name, username }) => {
  return (
    <>
        <div className={`flex justify-start items-center gap-2`}>
            <div className={`w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center text-neutral-500`}><FaUserLarge /></div>
            <div className={`flex flex-col items-start justify-center`}>
                <div className={`text-sm text-neutral-500`}>@{username}</div>
            </div>
        </div>
    </>
  )
}

export default UserCards