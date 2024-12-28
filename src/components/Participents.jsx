import React from 'react'
import UserCards from '../components/UserCards'

const Participents = ({data}) => {
  return (
    <div className={`min-h-[50vh] h-fit w-full px-3`}>
        {/* cards */}
        <div className={`flex flex-col gap-2`}>
            {
              data.map((user, idx)=>(
                <UserCards key={idx} username={user} />
              ))
            }
        </div>
        
    </div>
  )
}

export default Participents