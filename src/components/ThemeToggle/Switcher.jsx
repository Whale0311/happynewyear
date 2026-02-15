import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react'; // Hoặc dùng icon cờ VN/JP tùy thích

const Switcher = ({ currentTheme, onToggle }) => {
  const isVN = currentTheme === 'vn';

  return (
    <div 
      className={`w-24 h-10 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 shadow-inner
        ${isVN ? 'bg-red-100 border-2 border-red-300' : 'bg-blue-900 border-2 border-blue-700'}`}
      onClick={onToggle}
    >
      {/* Nút trượt (Handle) */}
      <motion.div
        className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-xl"
        layout // Magic prop của Framer Motion: tự động animate khi thay đổi layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{ 
          // Nếu là VN thì nằm bên trái (flex-start), JP thì đẩy sang phải
          marginLeft: isVN ? '0%' : 'calc(100% - 2rem)' 
        }}
      >
        {isVN ? '🇻🇳' : '🇯🇵'}
      </motion.div>
      
      {/* Label chìm (Optional) */}
      <span className={`absolute text-xs font-bold pointer-events-none transition-opacity duration-300 ml-12
        ${isVN ? 'text-red-500 opacity-100' : 'opacity-0'}`}>
        VN
      </span>
      <span className={`absolute text-xs font-bold pointer-events-none transition-opacity duration-300 ml-3 text-blue-200
        ${!isVN ? 'opacity-100' : 'opacity-0'}`}>
        JP
      </span>
    </div>
  );
};

export default Switcher;