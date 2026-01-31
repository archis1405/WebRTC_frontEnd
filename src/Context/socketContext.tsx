import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import {v4 as UUIDv4} from "uuid";

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

    const [user,setUser] = useState<Peer>(); // new Peer user for WebRTC connections
    const [stream,setStream] = useState<MediaStream | null>(null); // MediaStream for local video/audio

    const fetchParticipantsList = ({ roomId, participants }: { roomId: string, participants: string[] }) => {
         console.log("Fetched Participants ");
         console.log(roomId,participants);
    }

    const fetchUserFeed = async() => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(stream);
    }

    useEffect(() => {

        const userId = UUIDv4();
        const newPeer = new Peer(userId);

        fetchUserFeed();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(newPeer);

        const enterRoom = ({ roomId } : { roomId: string }) => {
            navigate(`/room/${roomId}`);
        }

        socket.on("room-created", enterRoom);

        socket.on("get-users", fetchParticipantsList);

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SocketContext.Provider value={{ socket,user,stream }}>
            {children}
        </SocketContext.Provider>
    );
}