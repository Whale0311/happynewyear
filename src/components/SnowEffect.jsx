// src/components/SnowEffect.jsx
import React, { useEffect, useState } from 'react';
import { FaRegSnowflake } from "react-icons/fa";

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Tạo style cho keyframes animation bằng thẻ <style> động
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes fall {
        0% { top: -50px; opacity: 0; }
        10% { opacity: 1; }
        100% { top: 100vh; opacity: 0; }
      }
      @keyframes rotate {
        0% { transform: translateX(0) rotate(0deg); }
        50% { transform: translateX(20px) rotate(180deg); }
        100% { transform: translateX(0) rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);

    // Tạo dữ liệu bông tuyết
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "vw",
      size: Math.random() * 15 + 10 + "px",
      duration: Math.random() * 5 + 5 + "s",
      delay: Math.random() * 5 + "s",
      opacity: Math.random() * 0.5 + 0.3
    }));
    setSnowflakes(flakes);

    return () => {
      document.head.removeChild(styleSheet);
    }
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', backgroundColor: '#0f172a', overflow: 'hidden' }}>
      
      {/* 1. Các hiệu ứng nền */}
      <SnowEffect />
      <FireworksEffect isRunning={timerData.isNewYear} />

      {/* 2. Nút ngôn ngữ */}
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 9999 }}>
         <LanguageSwitch isVietnamese={isVietnamese} onToggle={() => setIsVietnamese(!isVietnamese)} />
      </div>

      {/* 3. Nội dung chính - Dùng ABSOLUTE để căn giữa cứng */}
      <div style={{ 
          position: 'absolute', // Thay đổi quan trọng nhất
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white',
          zIndex: 2000,
          pointerEvents: 'none' // Để chuột có thể bấm xuyên qua vùng trống nếu cần
      }}>
          {/* Bọc nội dung text trong thẻ div có pointer-events: auto để copy được chữ */}
          <div style={{ pointerEvents: 'auto', textAlign: 'center' }}>
            {timerData.isNewYear ? (
              <div>
                 <h1 style={{ fontSize: '3rem', color: '#FFD700', textShadow: '0 0 20px #ff0000', marginBottom: '20px' }}>
                   {isVietnamese ? "CHÚC MỪNG NĂM MỚI 2026!" : "HAPPY NEW YEAR 2026!"} 🎆
                 </h1>
                 <p style={{ fontSize: '1.5rem' }}>
                   {isVietnamese ? "Vạn sự như ý - An khang thịnh vượng" : "Wishing you a prosperous year ahead!"}
                 </p>
              </div>
            ) : (
              <>
                <h1 style={{ marginBottom: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  {isVietnamese ? "Sắp đến Tết rồi" : "Tet Holiday Countdown"}
                </h1>
                
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <TimeBox value={timerData.days} label={isVietnamese ? "Ngày" : "Days"} />
                  <TimeBox value={timerData.hours} label={isVietnamese ? "Giờ" : "Hours"} />
                  <TimeBox value={timerData.minutes} label={isVietnamese ? "Phút" : "Mins"} />
                  <TimeBox value={timerData.seconds} label={isVietnamese ? "Giây" : "Secs"} />
                </div>
              </>
            )}
          </div>
      </div>
    </div>
  );
};

export default SnowEffect;