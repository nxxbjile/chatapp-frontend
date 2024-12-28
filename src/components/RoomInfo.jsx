import React from 'react'
import { IoImageOutline } from 'react-icons/io5'

const RoomInfo = ({ name, total_members}) => {
  return (
    <div className={`min-h-[50vh] h-fit w-full flex flex-col items-center justify-center`}>
        <div className={`text-5xl bg-neutral-700 rounded-full w-36 h-36 flex items-center justify-center text-neutral-500`}>
            <IoImageOutline />
        </div>
        <div className={`flex flex-col items-center justify-center h-fit p-2`}>
            <div className={`text-3xl text-neutral-500`}>{name ? name : "Invalid name"}</div>
            <div className={`flex gap-2 items-center justify-center`}>
                <div className={`w-4 h-4 rounded-full bg-green-500`} />
                <div className={`text-sm text-neutral-500`}>{total_members ? `${total_members} Members` : "None"}</div>
            </div>
        </div>
    </div>
  )
}

export default RoomInfo