import SocketIoClient from "socket.io-client";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WS_Server = "http://localhost:3000"; // Replace with your WebSocket server URL

// eslint-disable-next-line @typescript-eslint/no-explicit-any, react-refresh/only-export-components
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server,{
    withCredentials: false,
    transports: ['websocket','polling'],
});

interface Props{
    children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {

        const enterRoom = ({ roomId } : { roomId: string }) => {
            navigate(`/room/${roomId}`);
        }

        socket.on("room-created", enterRoom);
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}