import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/socketContext";

const Room: React.FC = () => {

    const {id} = useParams<{id: string}>();
    const { socket,user } = useContext(SocketContext);

    const fetchParticipantsList = ({ roomId, participants }: { roomId: string, participants: string[] }) => {
         console.log("Fetched Participants ");
         console.log(roomId,participants);
    }

    useEffect(() => {
        if(user){
            console.log("New user joined the room:", id);
            socket.emit("joined-room", {roomId: id , peerId: user._id} );

            socket.on("get-users", fetchParticipantsList);
        }
    }, [id,user,socket]);

    return (
        <div>
            Room Component {id}
        </div>
    );  
}

export default Room;