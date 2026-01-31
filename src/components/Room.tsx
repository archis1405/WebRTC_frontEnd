import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/socketContext";

const Room: React.FC = () => {

    const {id} = useParams<{id: string}>();
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.emit("joined-room", {roomId: id});
    }, []);

    return (
        <div>
            Room Component {id}
        </div>
    );  
}

export default Room;