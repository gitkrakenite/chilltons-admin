import { useRef } from "react";
import MySong from "../assets/not.mp3";

const TestPage = () => {
  const audioRef = useRef(null);

  const handlePlayAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
    }
  };

  return (
    <div>
      <button onClick={handlePlayAudio}>Play Audio</button>
      <audio ref={audioRef} src={MySong} />
    </div>
  );
};

export default TestPage;
