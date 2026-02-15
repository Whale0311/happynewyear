import React, { useState, useEffect, useRef } from 'react';
import { FaRegSnowflake, FaMusic, FaVolumeMute } from "react-icons/fa";
import { Fireworks } from '@fireworks-js/react';

// --- CẤU HÌNH DỮ LIỆU ---
const IS_TEST_MODE = false; 

// Danh sách lời chúc (Phiên bản Du Học Sinh Trao Đổi)
const WISHES = [
  { 
    id: 1, 
    icon: "✨", 
    title: "Vạn Sự Như Ý", 
    text: "Vạn sự như ý\nTriệu sự như mơ\nTrăm sự bất ngờ\nHàng giờ hạnh phúc\nMọi phút rạng ngời\nTừng giây đáng nhớ" 
  },
  { 
    id: 2, 
    icon: "🏠", 
    title: "Gia Đình Bình An", 
    text: "Chúc những người thân yêu của cậu luôn mạnh khỏe, vui vẻ và bình an." 
  },
  { 
    id: 3, 
    icon: "📸", 
    title: "Kỷ Niệm Đầy ắp", 
    text: "Điện thoại full bộ nhớ ảnh đẹp\nMỗi ngày trôi qua đều là một niềm vui.\nNhớ đăng vlog nữa nhé " 
  },
  { 
    id: 4, 
    icon: "🍫", 
    title: "Một Chút Ngọt Ngào", 
    text: "Chúc cậu một mùa Valentine ấm áp. Mong cậu luôn tìm thấy niềm vui từ những điều xung quanh và cảm nhận hạnh phúc theo cách của riêng mình" 
  },
  { 
    id: 5, 
    icon: "🌸", 
    title: "Luôn Luôn Bình An", 
    text: "Giữ sức khỏe để đi được nhiều hơn nha!." 
  },
  { 
    id: 6, 
    icon: "🐎", 
    title: "Mã Đáo Thành Công", 
    text: "Chúc kỳ trao đổi của cậu có thật nhiều trải nghiệm để đời!" 
  },
];

// --- COMPONENT MỚI: Chú Ngựa May Mắn (Cấu trúc tách rời chuyển động) ---
const RunningHorse = ({ isVietnamese }) => {
  const [isInteracting, setIsInteracting] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isInteracting) return;

    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 3000);
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '10px',
        zIndex: 900,
        cursor: 'pointer',
        // 1. CONTAINER CHA: Chỉ chịu trách nhiệm DI CHUYỂN vị trí (Trái <-> Phải)
        // Tuyệt đối KHÔNG dùng scaleX ở đây để tránh lật ngược bong bóng con
        animation: 'movePosition 20s linear infinite',
        animationPlayState: isInteracting ? 'paused' : 'running',
      }}
    >
      {/* 2. BONG BÓNG: Nằm trong container di chuyển nên chạy theo ngựa, 
             nhưng KHÔNG chịu ảnh hưởng của việc lật mặt */}
      {isInteracting && (
        <div style={{
          position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
          background: 'white', padding: '10px 15px', borderRadius: '15px',
          border: '2px solid #da251d', color: '#da251d', fontWeight: 'bold', whiteSpace: 'nowrap',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)', 
          zIndex: 910,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {isVietnamese ? "Mã Đáo Thành Công!" : "Wishing you all the best!"}
          <div style={{ // Mũi tên bong bóng
            position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)',
            borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #da251d'
          }}></div>
        </div>
      )}

      {/* 3. CONTAINER HÌNH ẢNH: Chịu trách nhiệm LẬT MẶT (Quay đầu)
             Nó nằm song song với bong bóng, nên bong bóng không bị lật theo */}
      <div style={{
         animation: 'faceDirection 20s linear infinite', // Phải đồng bộ thời gian với movePosition
         animationPlayState: isInteracting ? 'paused' : 'running' // Phải dừng cùng lúc với cha
      }}>
        <img 
          src="/horse_run.gif" 
          alt="Running Horse" 
          style={{ 
            height: '80px', width: 'auto',
            // Animation nhún nhảy khi đứng yên
            animation: isInteracting ? 'bounceInPlace 0.5s infinite' : 'none' 
          }} 
        /> 
      </div>

      <style>{`
        /* Animation 1: Chỉ di chuyển vị trí Left */
        @keyframes movePosition {
          0% { left: 110%; }   /* Bắt đầu bên phải */
          50% { left: -10%; }  /* Chạy sang trái */
          50.01% { left: -10%; } /* Điểm quay đầu */
          100% { left: 110%; } /* Chạy về bên phải */
        }
        
        /* Animation 2: Chỉ lật mặt ảnh (ScaleX) */
        /* Lưu ý: GIF gốc của bạn mặt hướng về bên TRÁI */
        @keyframes faceDirection {
          0% { transform: scaleX(1); }      /* Hướng Trái (Mặc định) */
          49.9% { transform: scaleX(1); }
          50% { transform: scaleX(-1); }    /* Lật sang Phải */
          100% { transform: scaleX(-1); }
        }

        @keyframes bounceInPlace {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) scale(0.8); } to { opacity: 1; transform: translateX(-50%) scale(1); } }
      `}</style>
    </div>
  );
};
// Nhạc Tết 
const TetMusicPlayer = ({ isPlaying, onToggle }) => {
  return (
    <div 
      onClick={onToggle}
      style={{
        position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000,
        width: '50px', height: '50px', borderRadius: '50%',
        background: 'rgba(0,0,0,0.6)', border: '2px solid #FFD700',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', boxShadow: '0 0 15px #FFD700',
        animation: isPlaying ? 'spin 4s linear infinite' : 'none'
      }}
    >
      {isPlaying ? <FaMusic color="#FFD700" size={24} /> : <FaVolumeMute color="white" size={24} />}
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

//Component FireworkName
const FireworkName = ({ name = "Mai" }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const isStartedRef = useRef(false);
  const launchCountRef = useRef(0); // Đếm số lần đã bắn

  // Cấu hình Physics
  const CONFIG = {
    rocketSpeed: 16,
    explosionForce: 30,
    friction: 0.95,
    gravity: 0.15,
    spring: 0.06,
    magnetDelay: 30,
    holdTime: 300,
    fadeSpeed: 0.015,
    sampleStep: window.innerWidth < 768 ? 6 : 9
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // STATE MACHINE
    let state = {
        phase: 'ROCKET',
        tick: 0,
        rocket: { x: width / 2, y: height, targetY: height * 0.35 },
        particles: [],
        text: "" // Lưu trữ chữ hiện tại đang bắn
    };

    // --- HÀM LẤY TỌA ĐỘ CHỮ (Đã nâng cấp để hỗ trợ tiếng Nhật) ---
    const getTextPoints = (text, centerX, centerY) => {
        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d');
        offCanvas.width = width;
        offCanvas.height = height;

        // KIỂM TRA NGÔN NGỮ ĐỂ CHỌN FONT & SIZE
        // Nếu là tiếng Nhật (chứa ký tự đặc biệt), dùng font thường và size nhỏ hơn
        const isJapanese = /[^\u0000-\u007f]/.test(text) && text.length > 3;
        
        let fontSize;
        let fontFamily;

        if (isJapanese) {
            // Tiếng Nhật: Font nhỏ hơn vì chuỗi dài
            fontSize = width < 768 ? 50 : 100; 
            fontFamily = 'sans-serif'; // Dùng font hệ thống cho an toàn
        } else {
            // Tiếng Việt/Anh (Mai): Font to, bay bổng
            fontSize = width < 768 ? 100 : 220;
            fontFamily = '"Dancing Script", sans-serif';
        }

        offCtx.font = `bold ${fontSize}px ${fontFamily}`;
        offCtx.fillStyle = '#FFFFFF';
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        
        // Vẽ chữ
        offCtx.fillText(text, width / 2, height / 2);

        const imageData = offCtx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const points = [];
        const step = CONFIG.sampleStep;

        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                if (data[(y * width + x) * 4 + 3] > 128) {
                    points.push({ 
                        x: x - width / 2 + centerX, 
                        y: y - height / 2 + centerY 
                    });
                }
            }
        }
        return points;
    };

    // --- RESET & CHỌN TÊN ĐỂ BẮN ---
    const resetFirework = () => {
        // LOGIC CHỌN TÊN:
        // Lần đầu tiên (count = 0) -> Bắn tiếng Nhật
        // Các lần sau (count > 0) -> Bắn chữ "Mai"
        let currentText = name;
        if (launchCountRef.current === 0) {
            currentText = "クック ホアン マイ";
        } else {
            currentText = name;
        }
        
        // Tăng biến đếm để lần sau không bắn tiếng Nhật nữa
        launchCountRef.current++; 

        // Random vị trí bắn
        const newTargetX = width * (0.2 + Math.random() * 0.6);
        const newTargetY = height * (0.25 + Math.random() * 0.2);

        state = {
            phase: 'ROCKET',
            tick: 0,
            rocket: { 
                x: newTargetX, 
                y: height, 
                targetY: newTargetY 
            },
            particles: [],
            text: currentText // Lưu text vào state
        };
    };

    // Hàm Nổ
    const explode = () => {
        // Truyền text hiện tại vào hàm lấy điểm
        const points = getTextPoints(state.text, state.rocket.x, state.rocket.y);
        
        points.forEach(pt => {
            const angle = Math.random() * Math.PI * 2;
            const force = Math.random() * CONFIG.explosionForce;
            
            // Phối màu Blue & Gold
            const rand = Math.random();
            let color;
            if (rand < 0.15) color = '#FFD700'; 
            else if (rand < 0.25) color = '#FFFFFF';
            else {
                const bluePalette = ['#00FFFF', '#00BFFF', '#1E90FF']; 
                color = bluePalette[Math.floor(Math.random() * bluePalette.length)];
            }

            state.particles.push({
                x: state.rocket.x,
                y: state.rocket.y,
                vx: Math.cos(angle) * force, 
                vy: Math.sin(angle) * force,
                targetX: pt.x,
                targetY: pt.y,
                color: color,
                size: Math.random() * 2.5 + 1.5,
                alpha: 1 
            });
        });
    };

    // --- LOOP ---
    const loop = () => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; 
        ctx.fillRect(0, 0, width, height);
        
        ctx.globalCompositeOperation = 'lighter'; 

        if (state.phase === 'ROCKET') {
            state.rocket.y -= CONFIG.rocketSpeed;
            
            ctx.beginPath();
            ctx.arc(state.rocket.x, state.rocket.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#00FFFF';
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(state.rocket.x, state.rocket.y + 10);
            ctx.lineTo(state.rocket.x, state.rocket.y + 50);
            ctx.strokeStyle = 'rgba(0, 191, 255, 0.5)';
            ctx.lineWidth = 3;
            ctx.stroke();

            if (state.rocket.y <= state.rocket.targetY) {
                state.phase = 'EXPLODE';
                explode();
                ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
                ctx.fillRect(0, 0, width, height);
            }
        } 
        
        else {
            state.tick++; 

            if (state.phase === 'EXPLODE' && state.tick > CONFIG.holdTime) {
                state.phase = 'FADE'; 
            }

            let magnetStrength = 0;
            if (state.phase === 'EXPLODE' && state.tick > CONFIG.magnetDelay) {
                magnetStrength = (state.tick - CONFIG.magnetDelay) * 0.005; 
                if (magnetStrength > CONFIG.spring) magnetStrength = CONFIG.spring;
            }

            let aliveParticles = 0;
            state.particles.forEach(p => {
                if (p.alpha <= 0) return; 
                aliveParticles++;

                p.vx *= CONFIG.friction; 
                p.vy *= CONFIG.friction; 
                p.vy += CONFIG.gravity; 

                if (state.phase === 'EXPLODE' && magnetStrength > 0) {
                    const dx = p.targetX - p.x;
                    const dy = p.targetY - p.y;
                    p.vx += dx * magnetStrength;
                    p.vy += dy * magnetStrength;
                    p.vy -= CONFIG.gravity; 
                }

                if (state.phase === 'FADE') {
                    p.alpha -= CONFIG.fadeSpeed;
                    p.vx += (Math.random() - 0.5) * 0.1; 
                } 

                p.x += p.vx;
                p.y += p.vy;

                ctx.globalAlpha = p.alpha; 
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.globalAlpha = 1; 
            });

            if (state.phase === 'FADE' && aliveParticles === 0) {
                resetFirework();
            }
        }

        animationRef.current = requestAnimationFrame(loop);
    };

    // START
    if (!isStartedRef.current) {
        // Load font Dancing Script cho chữ Mai
        document.fonts.load(`bold 100px "Dancing Script"`).then(() => {
            if (!isStartedRef.current) {
                isStartedRef.current = true;
                resetFirework(); 
                loop();
            }
        });
    }

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationRef.current);
        window.removeEventListener('resize', handleResize);
    };
  }, [name]);

  return (
    <canvas 
        ref={canvasRef} 
        style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            zIndex: 200, pointerEvents: 'none'
        }}
    />
  );
};

// --- COMPONENT MỚI: Thả Đèn Trời (Đã sửa lỗi import thừa) ---
const SkyLanterns = ({ isVietnamese }) => {
  const [lanterns, setLanterns] = useState([]);
  const [wishInput, setWishInput] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  // --- CẤU HÌNH WEBHOOK ---
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1462004741293740197/G6FWb97hMuWAbVCFhRsXcucDahQv2YwkvCUA2e37CptvUR5CpueRUyTD9wxWCxA4-bjm"; 

  const sendToDiscord = async (wishText) => {
    if (!DISCORD_WEBHOOK_URL) return;
    
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🏮 **Có người vừa thả đèn trời!**\n💌 Điều ước: **"${wishText}"**\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`
        })
      });
      console.log("Đã gửi điều ước về Discord!");
    } catch (error) {
      console.error("Lỗi gửi Discord:", error);
    }
  };

  const releaseLantern = () => {
    const finalWish = wishInput.trim() || (isVietnamese ? "Cầu mong bình an" : "平和を祈る");

    const newLantern = {
      id: Date.now(),
      left: Math.random() * 80 + 10, 
      speed: Math.random() * 10 + 20, 
      size: Math.random() * 60 + 80,  
      wobble: Math.random() * 2 + 2,  
    };
    setLanterns((prev) => [...prev, newLantern]);
    
    sendToDiscord(finalWish);

    setWishInput("");
    setIsInputVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      releaseLantern();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLanterns((prev) => prev.filter((l) => Date.now() - l.id < 40000));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div 
        onClick={() => setIsInputVisible(true)}
        style={{
          position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(45deg, #FF4500, #FFD700)', 
          padding: '12px 25px', borderRadius: '50px',
          color: 'white', fontWeight: 'bold', cursor: 'pointer', zIndex: 100,
          border: '2px solid #fff', boxShadow: '0 0 20px rgba(255, 69, 0, 0.6)',
          display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'pulse 2s infinite'
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>🏮</span> 
        {isVietnamese ? "Thả đèn hoa đăng ở đây nha" : "願いを飛ばす"}
      </div>

      {isInputVisible && (
        <div 
          onClick={() => setIsInputVisible(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', padding: '30px', borderRadius: '20px', 
              width: '90%', maxWidth: '400px', textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.3)',
              animation: 'zoomIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
            }}
          >
            <h3 style={{ color: '#FF4500', margin: '0 0 20px 0', fontSize: '1.5rem' }}>
              {isVietnamese ? "Điều ước năm mới" : "新年の願い"}
            </h3>
            <input 
              type="text" value={wishInput} onChange={(e) => setWishInput(e.target.value)} onKeyDown={handleKeyDown} 
              placeholder={isVietnamese ? "Nhập điều ước của bạn..." : "願い事を入力..."}
              style={{ width: '100%', padding: '15px', marginBottom: '20px', borderRadius: '10px', border: '2px solid #eee', fontSize: '1.1rem', boxSizing: 'border-box', outline: 'none' }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={releaseLantern} style={{ flex: 1, padding: '12px', background: '#FF4500', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>{isVietnamese ? "Thả Đèn 🏮" : "飛ばす"}</button>
              <button onClick={() => setIsInputVisible(false)} style={{ flex: 1, padding: '12px', background: '#f0f0f0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>{isVietnamese ? "Đóng" : "閉じる"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 60 }}>
        {lanterns.map((lantern) => (
          <div
            key={lantern.id}
            style={{
              position: 'absolute', left: `${lantern.left}%`, bottom: '-150px', width: `${lantern.size}px`, height: 'auto', opacity: 0.9,
              animation: `floatUp ${lantern.speed}s linear forwards, sway ${lantern.wobble}s ease-in-out infinite alternate`,
              filter: 'drop-shadow(0 0 15px rgba(255, 165, 0, 0.6))' 
            }}
          >
            <img src="/lantern.png" alt="lantern" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse { 0% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.05); } 100% { transform: translateX(-50%) scale(1); } }
        @keyframes floatUp { 0% { bottom: -150px; opacity: 0; transform: scale(0.8); } 10% { opacity: 1; transform: scale(1); } 100% { bottom: 120vh; opacity: 0.8; transform: scale(0.9); } }
        @keyframes sway { from { margin-left: -10px; transform: rotate(-3deg); } to { margin-left: 10px; transform: rotate(3deg); } }
        @keyframes zoomIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </>
  );
};
// 2. Dây Pháo Tương Tác (ĐÃ ĐIỀU CHỈNH NHỎ LẠI CHO ẢNH ĐÃ CẮT NỀN)
const FirecrackerString = ({ side }) => {
  const [isExploding, setIsExploding] = useState(false);
  const audioRef = useRef(new Audio('tiengphaono.mp3')); 

  const handleClick = () => {
    setIsExploding(true);
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log("Lỗi audio:", e));
    setTimeout(() => setIsExploding(false), 1000);
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        position: 'absolute', 
        top: 0,        // Treo sát trần
        [side]: 0,     // Treo sát góc tường
        zIndex: 50,
        cursor: 'pointer',
        // BỎ scale(1.5) đi, chỉ giữ lại logic rung lắc
        animation: isExploding ? 'shake 0.5s infinite' : 'swing 3s infinite ease-in-out',
        transformOrigin: 'top center',
      }}
    >
      <img 
        src="/firecracker.png"  
        alt="Pháo tết" 
        style={{ 
          // ĐIỀU CHỈNH KÍCH THƯỚC TẠI ĐÂY:
          // Min: 80px (điện thoại), Max: 140px (máy tính)
          // 10vw là kích thước trung bình (10% chiều rộng màn hình)
          width: 'clamp(80px, 10vw, 140px)', 
          height: 'auto', 
          display: 'block',
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))',
        }}
      />
      
      {/* Cập nhật lại keyframes bỏ scale để hiệu ứng rung mượt hơn */}
      <style>{`
        @keyframes shake { 
          0% { transform: rotate(0deg); } 
          25% { transform: rotate(5deg); } 
          50% { transform: rotate(0deg); } 
          75% { transform: rotate(-5deg); } 
          100% { transform: rotate(0deg); } 
        }
        @keyframes swing { 
          0%, 100% { transform: rotate(2deg); } 
          50% { transform: rotate(-2deg); } 
        }
      `}</style>
    </div>
  );
};

const LanguageSwitch = ({ isVietnamese, onToggle }) => {
  return (
    <div onClick={onToggle} style={{
      position: 'relative', width: '80px', height: '36px', borderRadius: '36px', cursor: 'pointer',
      border: isVietnamese ? '2px solid rgba(255,255,255,0.8)' : '2px solid #d1d5db',
      background: isVietnamese ? '#da251d' : '#ffffff', userSelect: 'none', WebkitTapHighlightColor: 'transparent',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: 'all 0.5s ease'
    }}>
      <div style={{
        position: 'absolute', top: '2px', left: isVietnamese ? '46px' : '3px',
        width: '28px', height: '28px', borderRadius: '50%', background: isVietnamese ? '#FFFF00' : '#2e2e2e',
        color: isVietnamese ? '#da251d' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 'bold', fontSize: '11px', boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
        transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)', border: '2px solid white', zIndex: 3
      }}>{isVietnamese ? "VN" : "JP"}</div>
      <div style={{
        position: 'absolute', top: '50%', right: '12px', transform: 'translate(0, -50%)', width: '16px', height: '16px',
        borderRadius: '50%', background: '#bc002d', opacity: isVietnamese ? 0 : 1, transition: 'opacity 0.3s ease', zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute', top: '48%', left: '28%', transform: 'translate(-50%, -50%)', color: '#FFFF00',
        fontSize: '18px', opacity: isVietnamese ? 1 : 0, transition: 'opacity 0.3s', zIndex: 1
      }}>★</div>
    </div>
  );
};

// --- COMPONENT ĐÃ SỬA LỖI CANH GIỮA: Popup Lì Xì ---
// --- COMPONENT ĐÃ SỬA LỖI LỆCH (Dùng margin: auto) ---
const WishPopup = ({ wish, onClose }) => {
  if (!wish) return null;
  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.6)', // Nền tối hơn chút để tập trung
        zIndex: 2000, 
        display: 'flex', 
        // QUAN TRỌNG: Bỏ alignItems và justifyContent ở đây
        // Để thằng con tự định vị bằng margin: auto sẽ mượt hơn
        backdropFilter: 'blur(3px)', 
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{
          // Kỹ thuật "margin: auto" giúp căn giữa tuyệt đối ngay lập tức
          margin: 'auto', 
          background: 'linear-gradient(135deg, #fff5e6, #fff)', 
          width: '90%', maxWidth: '400px',
          padding: '30px', borderRadius: '20px', textAlign: 'center', position: 'relative',
          border: '4px solid #da251d', boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
          // Đổi sang hiệu ứng popIn nhẹ nhàng hơn zoomIn
          animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{wish.icon}</div>
        <h2 style={{ color: '#da251d', margin: '0 0 10px 0', fontFamily: 'serif' }}>{wish.title}</h2>
        <p style={{ fontSize: '1.2rem', color: '#333', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{wish.text}</p>
        <button 
          onClick={onClose}
          style={{
            marginTop: '20px', padding: '10px 30px', background: '#da251d', color: '#ff0',
            border: 'none', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(218, 37, 29, 0.4)'
          }}
        >
          はい ❤️
        </button>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        /* Hiệu ứng nảy nhẹ, mượt hơn zoomIn */
        @keyframes popIn { 
            0% { opacity: 0; transform: scale(0.8) translateY(20px); } 
            100% { opacity: 1; transform: scale(1) translateY(0); } 
        }
      `}</style>
    </div>
  );
};
// --- COMPONENT: Gary Easter Egg (Đã Kích Âm Thanh) ---
const GaryEasterEgg = ({ isVietnamese }) => {
  const [isTalking, setIsTalking] = useState(false);
  
  // Hàm phát âm thanh với bộ khuếch đại (GainNode)
  const playWithBoost = (url) => {
    // 1. Tạo môi trường âm thanh
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return; // Phòng hờ trình duyệt cổ đại
    
    const audioCtx = new AudioContext();
    const audio = new Audio(url);
    
    // 2. Tạo nguồn và bộ khuếch đại
    const source = audioCtx.createMediaElementSource(audio);
    const gainNode = audioCtx.createGain();
    
    // 3. CHỈNH ĐỘ TO TẠI ĐÂY (Mặc định là 1.0)
    // 2.0 = To gấp đôi, 3.0 = To gấp ba
    gainNode.gain.value = 2.5; 
    
    // 4. Kết nối: Nguồn -> Khuếch đại -> Loa
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // 5. Phát
    audio.play().catch(e => console.log("Lỗi audio:", e));
    
    // (Tùy chọn) Dọn dẹp sau khi phát xong để đỡ tốn Ram
    audio.onended = () => {
        audioCtx.close();
    };
  };

  const handleClick = (e) => {
    e.stopPropagation();
    
    setIsTalking(true);
    setTimeout(() => setIsTalking(false), 2000);

    // Chọn file
    const fileUrl = isVietnamese ? '/zootopia_vn.mp3' : '/zootopia_en.mp3';
    
    // Gọi hàm phát to
    playWithBoost(fileUrl);
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        position: 'fixed', bottom: '20px', right: '20px', // Đã chỉnh sang phải
        zIndex: 1100, cursor: 'pointer',
        width: '100px', height: 'auto',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        animation: isTalking ? 'garyTalk 0.5s infinite' : 'garyIdle 3s infinite ease-in-out',
        filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
    >
      <img src="/carrotpen.png" alt="Carrot Pen" style={{ width: '100%', height: 'auto', display: 'block' }} />

      {isTalking && (
        <div style={{
          position: 'absolute', top: '-40px', right: '10%',
          background: 'white', color: '#333', padding: '5px 10px',
          borderRadius: '10px 10px 0 10px', fontSize: '0.8rem',
          fontWeight: 'bold', whiteSpace: 'nowrap',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          animation: 'popIn 0.3s forwards'
        }}>
          {isVietnamese ? "Yêu cô, cộng sự! 🦊🐰" : "Love you, partner! 🦊🐰"}
        </div>
      )}
      <style>{`
        @keyframes garyIdle { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(-2deg); } }
        @keyframes garyTalk { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.5) translate(10px, 10px); } to { opacity: 1; transform: scale(1) translate(0, 0); } }
      `}</style>
    </div>
  );
};
// --- hiệu ứng rơi-
const FallingEffect = ({ type, onSpecialClick }) => {
  const [items, setItems] = useState([]);
  const specialIndexRef = useRef(Math.floor(Math.random() * 25));

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes fall { 0% { top: -10%; opacity: 0; } 10% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
      @keyframes rotate { 0% { transform: translateX(0) rotate(0deg); } 50% { transform: translateX(20px) rotate(180deg); } 100% { transform: translateX(0) rotate(360deg); } }
      @keyframes floatSpecial { 
        0%, 100% { transform: translateX(0) rotate(0deg) scale(1.2); } 
        50% { transform: translateX(15px) rotate(10deg) scale(1.2); } 
      }
    `;
    document.head.appendChild(styleSheet);
    
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    if (particleCount <= specialIndexRef.current) {
        specialIndexRef.current = Math.floor(Math.random() * particleCount);
    }

    const newItems = Array.from({ length: particleCount }).map((_, i) => ({
      id: i, 
      left: Math.random() * 100 + "vw", 
      size: Math.random() * 15 + 10 + "px",
      duration: Math.random() * 5 + 5 + "s", 
      delay: Math.random() * 5 + "s", 
      opacity: Math.random() * 0.7 + 0.3
    }));
    setItems(newItems);
    return () => document.head.removeChild(styleSheet);
  }, [type]);

  return (
    // THAY ĐỔI QUAN TRỌNG: Tăng zIndex từ 1 lên 60 để hoa nổi lên trên lớp nội dung (zIndex 10)
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 60 }}>
      {items.map((item, index) => {
        const isSpecialOne = index === specialIndexRef.current && type === 'flower';

        const finalDuration = isSpecialOne ? '25s' : item.duration; 
        const finalAnimation = isSpecialOne 
            ? `fall ${finalDuration} linear infinite, floatSpecial 4s ease-in-out infinite` 
            : `fall ${item.duration} linear infinite, rotate 8s linear infinite`; 
        
        const finalFilter = isSpecialOne 
            ? 'drop-shadow(0 0 15px #FFD700) brightness(1.5)' 
            : 'none';
            
        const finalOpacity = isSpecialOne ? 1 : item.opacity; 
        // Hạt đặc biệt nổi cao hơn nữa
        const finalZIndex = isSpecialOne ? 100 : 1; 

        const commonStyle = {
          position: 'absolute', top: '-50px', left: item.left, fontSize: item.size, 
          opacity: finalOpacity,
          animation: finalAnimation, 
          animationDelay: isSpecialOne ? '0s' : item.delay, 
          filter: finalFilter,
          zIndex: finalZIndex,
          pointerEvents: isSpecialOne ? 'auto' : 'none',
          cursor: isSpecialOne ? 'pointer' : 'default',
          transition: 'transform 0.3s', 
        };
        
        if (type === 'snow') return <FaRegSnowflake key={item.id} style={{ ...commonStyle, color: 'white' }} />;
        
        return (
          <div 
            key={item.id} 
            style={commonStyle}
            onClick={isSpecialOne ? onSpecialClick : undefined}
            onMouseEnter={(e) => { if(isSpecialOne) e.currentTarget.style.transform = 'scale(1.5)'; }}
            onMouseLeave={(e) => { if(isSpecialOne) e.currentTarget.style.transform = 'scale(1)'; }}
          >
            🌸
          </div>
        );
      })}
    </div>
  );
};
const VipFireworks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // --- CẤU HÌNH ---
    const IS_DESKTOP = window.innerWidth > 800;
    // Tăng số lượng hạt lên để nhìn cho đã mắt
    const PARTICLE_COUNT = IS_DESKTOP ? 120 : 60; 
    // Độ cản gió (Càng gần 1 thì càng ít cản, càng nhỏ thì rơi càng chậm)
    const FRICTION = 0.95; 
    const GRAVITY = 0.04; // Trọng lực nhẹ thôi để pháo bay lơ lửng

    // --- HELPER ---
    const random = (min, max) => Math.random() * (max - min) + min;
    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const colors = ['#ff0043', '#14fc56', '#1e7fff', '#e60aff', '#ffbf36', '#ffffff', '#00ffff'];

    // --- CLASSES ---

    // 1. Particle: Hạt pháo hoa chính
    class Particle {
      constructor(x, y, color, speed, angle) {
        this.x = x;
        this.y = y;
        this.color = color;
        // Tách vận tốc ra X và Y để tính toán vật lý chuẩn hơn
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.friction = FRICTION;
        this.gravity = GRAVITY;
        this.alpha = 1; // Độ trong suốt
        // Thời gian sống ngẫu nhiên để hạt tắt không đều nhau -> tự nhiên hơn
        this.decay = random(0.005, 0.015); 
        
        // Hiệu ứng lấp lánh (Sparkle trail)
        this.coordinates = [];
        this.coordinateCount = 5;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
      }

      update() {
        // Lưu lại vị trí cũ để vẽ đuôi
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        // Vật lý: Giảm tốc độ theo ma sát
        this.vx *= this.friction;
        this.vy *= this.friction;
        // Vật lý: Cộng trọng lực
        this.vy += this.gravity;

        // Cập nhật vị trí
        this.x += this.vx;
        this.y += this.vy;

        // Mờ dần
        this.alpha -= this.decay;
      }

      draw(ctx) {
        ctx.beginPath();
        // Vẽ đường nối từ vị trí cũ đến mới -> tạo đuôi
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsla(${this.hueFromColor(this.color)}, 100%, 50%, ${this.alpha})`;
        // Nếu là màu trắng/vàng thì cho sáng hơn
        if (this.color === '#ffffff' || this.color === '#ffbf36') {
             ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        }
        ctx.lineWidth = 2.5; // Đủ dày để thấy rõ trên nền ảnh
        ctx.stroke();
      }

      // Hàm phụ chuyển đổi màu hex sang độ HSL để dễ chỉnh sáng
      hueFromColor(color) {
        // Map đơn giản màu sang Hue (độ màu)
        const map = {
            '#ff0043': 345, '#14fc56': 130, '#1e7fff': 210, 
            '#e60aff': 280, '#ffbf36': 45, '#ffffff': 0, '#00ffff': 180
        };
        return map[color] || 0;
      }
    }

    // 2. Firework: Viên pháo bay lên
    class Firework {
      constructor(sx, sy, tx, ty) {
        this.x = sx;
        this.y = sy;
        this.sx = sx;
        this.sy = sy;
        this.tx = tx;
        this.ty = ty;
        this.distanceToTarget = Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2));
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(ty - sy, tx - sx);
        this.speed = 2;
        this.acceleration = 1.05;
        this.brightness = random(50, 70);
        this.targetRadius = 1;
        this.isDone = false; // Đánh dấu để nổ
      }

      update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        // Bay nhanh dần lên
        this.speed *= this.acceleration;
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        this.distanceTraveled = Math.sqrt(Math.pow(this.sx - this.x, 2) + Math.pow(this.sy - this.y, 2));

        if (this.distanceTraveled >= this.distanceToTarget) {
            this.isDone = true; // Kích hoạt nổ
        } else {
            this.x += vx;
            this.y += vy;
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'; // Đuôi pháo bay lên màu trắng
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // --- MAIN LOGIC ---
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Resize fix
    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    let fireworks = [];
    let particles = [];
    let animationId;
    let timerTotal = 80;
    let timerTick = 0;

    // Hàm tạo vụ nổ (Explosion)
    const createParticles = (x, y) => {
        const particleCount = PARTICLE_COUNT;
        // Chọn ngẫu nhiên kiểu nổ: 
        // 1. Nổ tròn đều (màu ngẫu nhiên)
        // 2. Nổ 2 màu (đẹp hơn)
        const type = Math.random();
        const baseColor = randomChoice(colors);
        const secondColor = randomChoice(colors);

        for (let i = 0; i < particleCount; i++) {
            let color = baseColor;
            if (type > 0.5 && i % 2 === 0) color = secondColor;

            // Góc bắn tủa ra vòng tròn
            const angle = (Math.PI * 2 / particleCount) * i;
            // Tốc độ ngẫu nhiên để tạo độ sâu
            const speed = random(3, 8); 
            
            particles.push(new Particle(x, y, color, speed, angle));
        }
    };

    const loop = () => {
        animationId = requestAnimationFrame(loop);

        // --- KỸ THUẬT LÀM MỜ (TRAILS) TRÊN NỀN TRONG SUỐT ---
        // Thay vì vẽ đè màu đen, ta dùng destination-out để "tẩy" canvas dần dần
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // 0.2 = Độ dài đuôi (càng nhỏ đuôi càng dài)
        ctx.fillRect(0, 0, width, height);
        
        // Chuyển lại chế độ vẽ chồng màu sáng (quan trọng để pháo đẹp)
        ctx.globalCompositeOperation = 'lighter';

        // 1. Xử lý pháo đang bay lên
        let i = fireworks.length;
        while (i--) {
            fireworks[i].draw(ctx);
            fireworks[i].update(i);
            if (fireworks[i].isDone) {
                // Pháo đã lên đến đỉnh -> Nổ
                createParticles(fireworks[i].x, fireworks[i].y);
                fireworks.splice(i, 1);
            }
        }

        // 2. Xử lý hạt đã nổ (Particles)
        let j = particles.length;
        while (j--) {
            particles[j].draw(ctx);
            particles[j].update();
            // Xóa hạt khi đã tắt hẳn
            if (particles[j].alpha <= 0) {
                particles.splice(j, 1);
            }
        }

        // 3. Tự động bắn pháo
        if (timerTick >= timerTotal) {
            // Bắn từ dưới màn hình lên vị trí ngẫu nhiên ở 1/3 trên
            const startX = width / 2;
            const startY = height;
            const targetX = random(width * 0.2, width * 0.8);
            const targetY = random(height * 0.1, height * 0.5);
            
            fireworks.push(new Firework(startX, startY, targetX, targetY));
            // Bắn thêm quả nữa cho vui
            if(IS_DESKTOP) {
                 fireworks.push(new Firework(random(0, width), height, random(0, width), random(0, height/2)));
            }

            timerTick = 0;
            // Random thời gian bắn phát tiếp theo
            timerTotal = random(30, 60); 
        } else {
            timerTick++;
        }
    };

    loop();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5, 
        pointerEvents: 'none', // Click xuyên qua
        background: 'transparent' // Nền trong suốt
      }}
    />
  );
};
// --- COMPONENT ĐÃ SỬA LỖI FONT CHỮ: Bức Thư Tâm Tình ---
const LetterToMai = ({ isVietnamese, isOpen, onClose }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  // --- NỘI DUNG THƯ ---
  const LETTER_CONTENT = isVietnamese 
    ? "To Bánh Khúc,\n\nManifest món quà tớ tặng cậu không bị lỗi 🙇🏻‍♂️🙏🏻\nTớ có ý tưởng làm cái này từ lúc cậu bảo cậu trao đổi một năm và không về ăn Tết được. Cảm ơn cậu vì những câu chuyện, những lời chia sẻ, lời khuyên và cả những hôm thức khuya nữa 🤣.\nHy vọng nó sẽ giúp cậu xem được pháo hoa, cảm nhận không khí giao thừa với mọi người ở Việt Nam và ngày Tết của cậu sẽ thêm vui vẻ, rộn ràng hơn.\nChúc cậu một năm mới thật hạnh phúc, tràn đầy yêu thương và điều ước của cậu sẽ thành sự thật.\nHappy New Year 2026! ❤️"
    : "Maiへ,\n\nあけましておめでとうございます。\nMaiにとって、笑顔あふれる素敵な一年になりますように。\n今年もよろしくお願いします！\n\nHappy New Year 2026! ❤️";

  useEffect(() => {
    if (isOpen) {
      setDisplayedText(""); 
      let currentIndex = 0;
      
      const timer = setInterval(() => {
        // --- SỬA LỖI TẠI ĐÂY ---
        // Thay vì cộng dồn (prev + char), ta cắt chuỗi từ đầu đến vị trí hiện tại
        // Cách này giúp chữ không bị nhân đôi hay mất ký tự tiếng Việt
        if (currentIndex <= LETTER_CONTENT.length) {
          setDisplayedText(LETTER_CONTENT.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(timer);
        }
      }, 50); // Tốc độ gõ
      
      return () => clearInterval(timer);
    }
  }, [isOpen, LETTER_CONTENT]);

  if (!isOpen) return null;

  return (
    <div 
        onClick={onClose} 
        style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.8)', zIndex: 2000, 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(5px)'
        }}
    >
        <div 
        onClick={(e) => e.stopPropagation()}
        style={{
            background: '#fffbe7', 
            backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)',
            backgroundSize: '100% 1.5em',
            width: '90%', maxWidth: '500px', borderRadius: '5px', padding: '40px 30px',
            position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            border: '1px solid #d3d3d3',
            animation: 'unfold 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards',
            transformOrigin: 'center center'
        }}
        >
        <div style={{
            position: 'absolute', top: '20px', right: '20px', width: '60px', height: '70px',
            border: '4px dotted #da251d', opacity: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'rotate(10deg)', fontSize: '2rem', color: '#da251d'
        }}>
            💮
        </div>

        <div 
            onClick={onClose}
            style={{ 
            position: 'absolute', top: '-15px', right: '-15px', 
            width: '30px', height: '30px', background: '#da251d', color: 'white',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
            }}
        >
            ✕
        </div>

        <div style={{ 
            fontFamily: '"Times New Roman", serif', fontSize: '1.2rem', lineHeight: '1.5em', 
            color: '#333', whiteSpace: 'pre-wrap', textAlign: 'left', minHeight: '200px'
        }}>
            {displayedText}
            <span style={{ borderRight: '2px solid black', animation: 'blink 1s infinite' }}></span>
        </div>

        <div style={{ textAlign: 'right', marginTop: '30px', fontFamily: 'cursive', color: '#da251d', fontSize: '1.2rem', opacity: 0.8 }}>
            From: 3w_8letters
        </div>
        </div>
    </div>
  );
};
const App = () => {
  const DATE_VN_TET = "2026-02-17T00:00:00+07:00"; //2026-02-17T00:00:00+07:00
  const [isVietnamese, setIsVietnamese] = useState(false);
  const [timerData, setTimerData] = useState({ isNewYear: false, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedWish, setSelectedWish] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showNameFireworks, setShowNameFireworks] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  
  // Refs
  const audioRef = useRef(new Audio('/tet-song.mp3')); 
  const fireworkAmbienceRef = useRef(new Audio('/firework_ambience.mp3'));

  // Logic Nhạc nền
  useEffect(() => {
    if (isMusicPlaying) {
      audioRef.current.play().catch(e => console.log("Cần tương tác để phát nhạc:", e));
      audioRef.current.loop = true;
    } else {
      audioRef.current.pause();
    }
  }, [isMusicPlaying]);

  // Logic Đếm ngược
  useEffect(() => {
    if (!isVietnamese) return; 
    const calculateTime = () => {
      if (IS_TEST_MODE) return { isNewYear: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
      const now = new Date().getTime();
      const targetTime = new Date(DATE_VN_TET).getTime();
      const distance = targetTime - now;
      if (distance <= 0) return { isNewYear: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        isNewYear: false,
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };
    setTimerData(calculateTime());
    const interval = setInterval(() => setTimerData(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, [isVietnamese]);

  // Logic Hiện tên pháo hoa sau 10s
  useEffect(() => {
    if (timerData.isNewYear && isVietnamese) {
      const timer = setTimeout(() => {
        setShowNameFireworks(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [timerData.isNewYear, isVietnamese]);

  // Logic Âm thanh pháo hoa nền
  useEffect(() => {
    if (isVietnamese && timerData.isNewYear) {
      const audio = fireworkAmbienceRef.current;
      audio.loop = true; 
      audio.volume = 0.6; 
      audio.play().catch(e => console.log("Chặn autoplay pháo nền:", e));
    } else {
      fireworkAmbienceRef.current.pause();
      fireworkAmbienceRef.current.currentTime = 0;
    }
    return () => {
      fireworkAmbienceRef.current.pause();
    };
  }, [timerData.isNewYear, isVietnamese]);

  const bgStyle = {
    position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden', color: 'white',
    transition: 'background-image 0.5s ease',
    backgroundImage: isVietnamese 
      ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/vietnam.jpg')`
      : `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.6)), url('/japan.jpg')`,
    backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', touchAction: 'none'
  };

  return (
    <div style={bgStyle}>
      <FallingEffect 
        type={isVietnamese ? 'flower' : 'snow'} 
        onSpecialClick={() => setIsLetterOpen(true)} 
      />
      <RunningHorse isVietnamese={isVietnamese} />
      <GaryEasterEgg isVietnamese={isVietnamese} />
      
      {isVietnamese && (
        <>
          <TetMusicPlayer isPlaying={isMusicPlaying} onToggle={() => setIsMusicPlaying(!isMusicPlaying)} />
          <FirecrackerString side="left" />
          <FirecrackerString side="right" />
          <SkyLanterns isVietnamese={isVietnamese} />
          <LetterToMai 
            isVietnamese={isVietnamese}
            isOpen={isLetterOpen}
            onClose={() => setIsLetterOpen(false)}
          />
        </>
      )}

      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
        <LanguageSwitch isVietnamese={isVietnamese} onToggle={() => setIsVietnamese(!isVietnamese)} />
      </div>

      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10,
        padding: '20px', boxSizing: 'border-box'
      }}>
        
        {isVietnamese ? (
          timerData.isNewYear ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {showNameFireworks && <FireworkName name="Mai" />}
              
              <div style={{ animation: 'zoomIn 1s', width: '100%' }}>
                <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '30px', textShadow: '0 2px 4px black' }}>
                  Click to receive wishes!
                </p>
              </div>

              {/* Wrapper giữ chỗ 100% để căn giữa */}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ 
                    display: 'flex', flexWrap: 'wrap', gap: '20px', 
                    justifyContent: 'center', maxWidth: '800px', width: '100%',
                    animation: 'appearSlowly 2s ease-out' 
                  }}>
                    {WISHES.map((wish, index) => (
                      <div 
                        key={wish.id}
                        onClick={() => setSelectedWish(wish)}
                        style={{
                          width: '80px', height: '100px', background: 'linear-gradient(to bottom, #da251d, #990000)',
                          borderRadius: '10px', border: '2px solid #FFD700', cursor: 'pointer',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                          animation: `bounce 3s infinite ${index * 0.2}s`
                        }}
                      >
                        <div style={{ fontSize: '2.5rem' }}>{wish.icon}</div>
                        <div style={{ fontSize: '0.7rem', color: '#FFD700', marginTop: '5px', fontWeight: 'bold' }}>Mở ngay</div>
                      </div>
                    ))}
                  </div>
                  <style>{`
                  @keyframes appearSlowly {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                  }
                  `}</style>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', marginBottom: '20px', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                Sắp đến giao thừa rùi!
              </h1>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto' }}>
                <TimeBox value={timerData.days} label="Ngày" />
                <TimeBox value={timerData.hours} label="Giờ" />
                <TimeBox value={timerData.minutes} label="Phút" />
                <TimeBox value={timerData.seconds} label="Giây" />
              </div>
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h1 style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', fontWeight: '300', margin: 0, letterSpacing: '5px', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>2026</h1>
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', margin: '10px 0', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>Happy New Year</h2>
            <div style={{ fontStyle: 'italic', opacity: 0.9, marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.5)', paddingTop: '20px', display: 'inline-block', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              明けましておめでとうございます
            </div>
          </div>
        )}
      </div>

      <WishPopup wish={selectedWish} onClose={() => setSelectedWish(null)} />

      {/* --- PHÁO HOA MỚI NÂNG CẤP --- */}
      {/* Chỉ hiện khi là Việt Nam và đã sang Năm Mới */}
      {isVietnamese && timerData.isNewYear && (
        <VipFireworks />
      )}
    </div>
  );
};
const TimeBox = ({ value, label }) => (
  <div style={{
    background: 'rgba(0, 0, 0, 0.4)', 
    padding: 'clamp(10px, 2vw, 15px)', 
    borderRadius: '12px', 
    minWidth: 'clamp(65px, 15vw, 90px)', 
    border: '1px solid rgba(255,255,255,0.3)', 
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)', 
    flex: '1 1 auto',
    display: 'flex',           
    flexDirection: 'column',  
    alignItems: 'center'       
  }}>
    <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', lineHeight: 1 }}>
      {value < 10 ? `0${value}` : value}
    </div>
    <div style={{ fontSize: '0.8rem', color: '#fcd34d', textTransform: 'uppercase', fontWeight: '600', marginTop: '5px' }}>
        {label}
    </div>
  </div>
);
export default App;