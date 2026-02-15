import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { wishes } from '../../data/messages'; // Import dữ liệu
import WishItem from './WishItem';
import WishModal from './WishModal';

const WishesList = ({ theme }) => {
  // State quản lý xem đang mở cái wish nào
  const [selectedWish, setSelectedWish] = useState(null);

  // Lọc data theo theme (VN hay JP)
  const currentWishes = wishes.filter(w => w.type === theme);

  return (
    <>
      {/* Lớp chứa các Item (pointer-events-none để click xuyên qua vùng trống) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {currentWishes.map((wish) => (
          <WishItem 
            key={wish.id} 
            wish={wish} 
            onClick={setSelectedWish} // Truyền hàm set state xuống con
          />
        ))}
      </div>

      {/* Modal hiển thị (nằm ngoài luồng layout bình thường) */}
      <AnimatePresence>
        {selectedWish && (
          <WishModal 
            wish={selectedWish} 
            onClose={() => setSelectedWish(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WishesList;