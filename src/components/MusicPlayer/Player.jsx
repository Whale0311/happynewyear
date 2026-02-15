import React, { useState, useRef } from 'react';
import { Music, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

const Player = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop src="/tet-song.mp3" /> {/* Nhớ bỏ file nhạc vào folder public */}
      
      <motion.button
        onClick={togglePlay}
        className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
            rotate: playing ? 360 : 0 // Xoay đĩa nhạc khi hát
        }}
        transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" } // Xoay đều vô tận
        }}
      >
        {playing ? <Pause size={24} /> : <Music size={24} />}
      </motion.button>
      
      {/* Tooltip nhắc nhở */}
      {!playing && (
        <div className="absolute bottom-16 right-0 bg-white text-gray-800 px-3 py-1 rounded-lg text-xs w-max shadow-lg animate-bounce">
          Bấm để nghe nhạc Tết nha! 🎶
        </div>
      )}
    </div>
  );
};

export default Player;