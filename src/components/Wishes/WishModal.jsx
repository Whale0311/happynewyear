import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const WishModal = ({ wish, onClose }) => {
  // Nếu không có wish (null) thì không render gì cả
  if (!wish) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto px-4">
      {/* Overlay click ra ngoài để đóng */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative text-center border-4 border-red-100 z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-6xl mb-4 animate-bounce">{wish.icon}</div>
        <h3 className="text-xl font-bold text-red-600 mb-2 uppercase tracking-wide">
          {wish.title}
        </h3>
        <p className="text-gray-700 leading-relaxed font-medium">
          "{wish.content}"
        </p>
        
        {/* Trang trí thêm chút hoa văn ở góc (optional) */}
        <div className="absolute bottom-0 right-0 opacity-10 text-6xl pointer-events-none">🌸</div>
      </motion.div>
    </div>
  );
};

export default WishModal;