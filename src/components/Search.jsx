import React, { useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import { GlobalContext } from '../contexts/Global'

const Search = () => {
    const { searchValue, setSearchValue, } = useContext(GlobalContext);
    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }
  return (
    <div className={`relative w-full p-2 flex items-center justify-center`}>
        <input type="text" className={`w-full rounded-lg bg-neutral-900 text-neutral-600 placeholder:text-neutral-600 px-4 p-2 focus:outline-none`} placeholder='Search' onChange={handleChange} value={searchValue} maxLength={14} />
        <FaSearch className={`absolute right-5 top-5 text-neutral-600 pointer-events-none`} />
    </div>
  )
}

export default Search