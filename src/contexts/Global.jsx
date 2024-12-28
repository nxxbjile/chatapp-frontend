import React, { createContext, useState } from 'react'


const GlobalContext = createContext();

const Global = ( {children} ) => {
    const [baseUrl, setBaseUrl] = useState(`${import.meta.env.VITE_BACKEND_URL}`);
    const [currRoom, setCurrRoom] = useState({});
    const [members, setMembers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [chats, setChats] = useState([]);
    // const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [currUser, setCurrUser] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [createRoomVisible, setCreateRoomVisible] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const toggleCreateRoom = () => {
        setCreateRoomVisible(!createRoomVisible);
    }

    function generateUnique12DigitNumber() {
        // Get the current timestamp in milliseconds
        const timestamp = Date.now().toString(); // e.g., "1697040238123"
      
        // Generate a random 6-digit number
        const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
      
        // Combine and trim to ensure 12 digits
        const uniqueNumber = timestamp.slice(-6) + randomPart;
      
        return uniqueNumber; // Guaranteed 12 digits
      }
      

      function formatDateTimeIST(dateString) {
        // Regular expression to match the expected format: "dd MMM yyyy, hh:mmAM/PM"
        const formattedDateTimeRegex = /^\d{1,2} [A-Za-z]{3} \d{4}, \d{1,2}:\d{2}(AM|PM)$/;
    
        // Check if the input dateString matches the formatted date-time pattern
        if (formattedDateTimeRegex.test(dateString)) {
            return dateString; // Return as is if already formatted
        }
    
        // Convert to Date object
        const date = new Date(dateString);
    
        // Convert to IST (UTC + 5:30)
        const ISTOffset = 5 * 60 + 30; // Offset in minutes
        const localTime = new Date(date.getTime() + ISTOffset * 60 * 1000);
    
        // Extract the day, month, and year
        const day = localTime.getUTCDate();
        const month = localTime.toLocaleString("en-US", { month: "short" });
        const year = localTime.getUTCFullYear();
    
        // Extract the hours and minutes
        let hours = localTime.getUTCHours(); // Hours in 24-hour format
        const minutes = localTime.getUTCMinutes().toString().padStart(2, "0"); // Ensure two digits for minutes
        const period = hours >= 12 ? "PM" : "AM";
    
        // Convert to 12-hour format
        hours = hours % 12 || 12;
    
        // Combine into the desired format
        return `${day} ${month} ${year}, ${hours}:${minutes}${period}`;
    }
    

  return (
    <GlobalContext.Provider
        value={{
            toggleSidebar,isSidebarOpen,
            setIsSidebarOpen,searchValue, setSearchValue,
            currUser, setCurrUser,
            baseUrl, setBaseUrl,
            chats, setChats,
            rooms, setRooms,
            currRoom, setCurrRoom,
            formatDateTimeIST, generateUnique12DigitNumber,
            members, setMembers,
            createRoomVisible, setCreateRoomVisible,
            toggleCreateRoom,
        }}
    >
        {children}
    </GlobalContext.Provider>
  )
}

export {Global, GlobalContext}