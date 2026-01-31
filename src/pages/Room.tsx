import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/socketContext";
import UserFeedPlayer from "../components/UserFeedPlayer";

const Room: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { socket, user, stream, peers } = useContext(SocketContext);

    useEffect(() => {
        if(user) {
            console.log("New user with id", user._id, "has joined room", id);
            socket.emit("joined-room", {roomId: id, peerId: user._id})
        }

    }, [id, user, socket, peers]);

    return (
        <div>
            <h2>Room: {id}</h2>

            {/* Local user */}
            {stream && <UserFeedPlayer stream={stream} />}

            {/* Remote users */}
            <div>
                <h3>Other Users</h3>
                {Object.keys(peers).map((peerId) => (
                    <UserFeedPlayer
                        key={peerId}
                        stream={peers[peerId].stream}
                    />
                ))}
            </div>
        </div>
    );
};

export default Room;