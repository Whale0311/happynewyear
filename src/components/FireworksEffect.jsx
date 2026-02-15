// src/components/FireworksEffect.jsx
import React from 'react';
import { Fireworks } from '@fireworks-js/react';

const FireworksEffect = ({ isRunning }) => {
  if (!isRunning) return null;

  return (
    <Fireworks
      options={{
        hue: { min: 0, max: 345 },
        acceleration: 1.05,
        brightness: { min: 50, max: 80 },
        decay: { min: 0.015, max: 0.03 },
        delay: { min: 15, max: 30 }, // Tốc độ bắn
        explosion: 5,
        flickering: 50,
        intensity: 30,
        traceLength: 3,
        traceSpeed: 10,
        rocketsPoint: { min: 0, max: 100 }, // Bắn từ toàn bộ chiều ngang bên dưới
        opacity: 0.5, 
        seed: 42,
        whiz: 6, 
        sound: { enabled: true, files: ['https://fireworks.js.org/sounds/explosion0.mp3'], volume: { min: 4, max: 8 } } // Có âm thanh nổ nhẹ (tuỳ chọn)
      }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        background: 'transparent', // Nền trong suốt để đè lên app
        zIndex: 9999, // Đảm bảo nổi lên trên cùng
        pointerEvents: 'none', // Để chuột vẫn click được các nút bên dưới
      }}
    />
  );
};

export default FireworksEffect;