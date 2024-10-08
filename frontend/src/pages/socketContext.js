import React, { createContext, useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socketRef = useRef();

    useEffect(() => {
        const socket = io(process.env.REACT_APP_BACKEND_URL, {
            auth: {
                token: localStorage.getItem('token')
            }
        });
        
        socket.on('onlineUser', (data) => {
            // Handle incoming online users
            console.log('Online users:', data);
        });

        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
};
