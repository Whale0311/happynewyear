import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParallaxEffect = ({ theme }) => {
  // Số lượng hạt muốn hiển thị (đừng để quá nhiều kẻo lag, khoảng 30-50 là đẹp)
  const particleCount = 30;

  // Tạo mảng các hạt với thông số ngẫu nhiên TĨNH (để khi re-render không bị giật)
  // useMemo giúp tính toán 1 lần duy nhất khi component được mount
  const particles = useMemo(() => {
    return [...Array(particleCount)].map((_, i) => ({
      id: i,
      // Vị trí bắt đầu ngang (x) ngẫu nhiên từ 0% đến 100% màn hình
      xStart: Math.random() * 100,
      // Vị trí kết thúc (gió thổi bay lệch đi)
      xEnd: Math.random() * 100,
      // Thời gian rơi (từ 5s đến 15s - rơi chậm mới chill)
      duration: 5 + Math.random() * 10,
      // Độ trễ (để chúng không rơi cùng 1 lúc)
      delay: Math.random() * 5,
      // Kích thước ngẫu nhiên
      size: 10 + Math.random() * 20, // 10px - 30px
    }));
  }, []);

  // Xác định kiểu dáng dựa trên theme
  // VN: Hoa đào (Màu hồng) | JP: Tuyết (Màu trắng)
  const isVietnam = theme === 'vn';
  
  // Màu sắc
  const particleColor = isVietnam ? 'bg-pink-300/80' : 'bg-white/80';
  
  // Hình dáng: 
  // - Tuyết: rounded-full (tròn)
  // - Hoa: rounded-tr-xl rounded-bl-xl (hình lá/cánh hoa)
  const particleShape = isVietnam ? 'rounded-tr-xl rounded-bl-xl' : 'rounded-full';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${particleColor} ${particleShape}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.xStart}%`,
            top: -50, // Bắt đầu ở trên mép màn hình
          }}
          // Định nghĩa chuyển động
          animate={{
            y: ["0vh", "110vh"], // Rơi từ trên xuống dưới đáy
            x: [`0vw`, `${particle.xEnd - particle.xStart}vw`], // Bay xiên theo gió
            rotate: [0, 360], // Xoay vòng tròn
            opacity: [0, 1, 1, 0], // Hiện dần rồi mờ đi ở cuối
          }}
          // Cấu hình chuyển động
          transition={{
            duration: particle.duration,
            repeat: Infinity, // Lặp lại vô tận
            delay: particle.delay,
            ease: "linear", // Chuyển động đều, không bị khựng
          }}
        />
      ))}
      
      {/* Lớp phủ mờ để background không quá gắt, làm nổi bật text */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isVietnam ? 'bg-orange-50/20' : 'bg-blue-900/10'
      }`}></div>
    </div>
  );
};

export default ParallaxEffect;