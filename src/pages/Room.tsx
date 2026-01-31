import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/socketContext";
import UserFeedPlayer from "../components/UserFeedPlayer";

const Room: React.FC = () => {

    const {id} = useParams<{id: string}>();
    const { socket,user,stream } = useContext(SocketContext);

    useEffect(() => {
        if(user){
            console.log("New user joined the room:", id);
            socket.emit("joined-room", {roomId: id , peerId: user._id} );

            
        }
    }, [id,user,socket]);

    return (
        <div>
            Room Component {id}
            <UserFeedPlayer stream={stream} />
        </div>
    );  
}

export default Room;