import React, { useState, useEffect } from 'react';

const DualClock = () => {
  const [now, setNow] = useState(new Date());
  
  // Thời điểm giao thừa Tết Bính Ngọ 2026 (Dương lịch: 17/02/2026 00:00:00 GMT+7)
  const TET_2026 = new Date('2026-02-17T00:00:00+07:00');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tính thời gian đếm ngược
  const diff = TET_2026 - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Helper format giờ
  const formatTime = (date, timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      {/* Card Việt Nam */}
      <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl text-center">
        <h3 className="text-xl font-bold text-red-800 mb-2">Hanoi (Home)</h3>
        <div className="text-4xl font-mono text-red-600 font-black tracking-widest">
          {formatTime(now, 'Asia/Ho_Chi_Minh')}
        </div>
        <p className="text-sm text-red-700 mt-2">Đang chờ bạn về...</p>
      </div>

      {/* Card Nhật Bản */}
      <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl text-center text-white">
        <h3 className="text-xl font-bold text-blue-200 mb-2">Tokyo (You)</h3>
        <div className="text-4xl font-mono text-blue-100 font-black tracking-widest">
          {formatTime(now, 'Asia/Tokyo')}
        </div>
        <p className="text-sm text-blue-300 mt-2">Chênh lệch +2 tiếng</p>
      </div>

      {/* Countdown chung */}
      <div className="md:col-span-2 bg-gradient-to-r from-red-500/80 to-orange-500/80 backdrop-blur-sm rounded-xl p-4 text-white text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
        <p className="uppercase text-xs font-bold tracking-widest mb-1">Sắp đến Tết rồi</p>
        <div className="text-2xl md:text-3xl font-bold">
          {days} ngày : {hours} giờ : {minutes} phút : {seconds} giây
        </div>
      </div>
    </div>
  );
};

export default DualClock;