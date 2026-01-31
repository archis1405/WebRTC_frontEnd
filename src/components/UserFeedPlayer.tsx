import React, { useEffect, useRef } from "react";

// Define the interface for your props
interface UserFeedPlayerProps {
    stream: MediaStream | null;
}

const UserFeedPlayer: React.FC<UserFeedPlayerProps> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video 
            ref={videoRef}
            style={{ 
                width: '300px', 
                height: '200px', 
                backgroundColor: 'black', // Good for UX before the stream loads
                objectFit: 'cover'       // Prevents stretching
            }}
            muted={true}
            autoPlay
            playsInline // Crucial for video playback on mobile browsers (especially iOS)
        />
    );
}

export default UserFeedPlayer;