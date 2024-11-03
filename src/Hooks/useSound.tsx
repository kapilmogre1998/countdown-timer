import { useEffect, useRef } from "react";

const useSound = (audiopath: string) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const pauseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    useEffect(() => {
        audioRef.current = new Audio(audiopath);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause(); // Pause the audio when component unmounts
                audioRef.current = null; // Clear the reference
            }
        };
    }, [audiopath]);

    return [playAudio, pauseAudio];
};

export default useSound;
