import {  useContext } from "react";
import { SocketContext } from "../Context/socketContext";

const CreateRoom: React.FC = () => {

    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        socket.emit(`createRoom`)
    }

    return (
        <button onClick={initRoom}
        className = "btn btn-secondary">
            Start a New meeting in a new room
        </button>
    );
}

export default CreateRoom;