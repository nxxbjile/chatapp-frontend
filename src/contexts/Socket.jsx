import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

// Create a Context for the socket
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => {
        return io(`${import.meta.env.VITE_BACKEND_URL}`, {
            transports: ['websocket'],
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });
    }, []); // Ensures the socket instance is created only once

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use the socket instance
export const useSocket = () => {
    return useContext(SocketContext);
};
