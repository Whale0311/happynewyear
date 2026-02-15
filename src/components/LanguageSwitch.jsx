import React from 'react';
import './LanguageSwitch.css';

const LanguageSwitch = ({ isVietnamese, onToggle }) => {
  return (
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        className="toggle-input" 
        checked={isVietnamese} 
        onChange={onToggle} 
      />
      <span className="slider">
        {/* Icon cờ nằm cố định ở 2 bên nền slider */}
        {/* Bên trái: Nhật Bản (Khi chưa check) */}
        <span style={{ opacity: isVietnamese ? 0.3 : 1 }}>🇯🇵</span>
        
        {/* Bên phải: Việt Nam (Khi đã check) */}
        <span style={{ opacity: isVietnamese ? 1 : 0.3 }}>🇻🇳</span>
      </span>
    </label>
  );
};

export default LanguageSwitch;