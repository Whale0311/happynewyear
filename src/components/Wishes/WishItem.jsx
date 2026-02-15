import React from 'react';
import { motion } from 'framer-motion';

const WishItem = ({ wish, onClick }) => {
  return (
    <motion.div
      className="absolute cursor-pointer pointer-events-auto text-4xl hover:scale-125 drop-shadow-lg z-20"
      // Lấy vị trí từ props data
      style={{ top: wish.top, left: wish.left }}
      
      // Hiệu ứng xuất hiện
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      
      // Hiệu ứng khi di chuột vào (nảy lên chút)
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.9 }}
      
      // Gọi hàm khi click
      onClick={() => onClick(wish)}
    >
      {wish.icon}
    </motion.div>
  );
};

export default WishItem;