import React, { useState, useEffect } from 'react';

export default function AndroidChrome({ children }) {
  const [time, setTime] = useState('19:34');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="android-simulator-frame">
      <div className="android-device">
        {/* Notch */}
        <div className="android-notch">
          <div className="android-camera"></div>
        </div>

        {/* Statusbar */}
        <div className="android-statusbar">
          <span style={{ fontWeight: '500' }}>{time}</span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {/* Cellular Signal Icon */}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
              <path d="M2 8h1v2H2V8zm2-2h1v4H4V6zm2-2h1v6H6V4zm2-2h1v8H8V2zm2-2h1v10h-1V0z" />
            </svg>
            {/* WiFi Icon */}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
              <path d="M7 9a1 1 0 100-2 1 1 0 000 2zm-3-3a4.5 4.5 0 016 0L8.5 7.5a2.1 2.1 0 00-3 0L4 6zm-2.5-2.5a8 8 0 0111 0L11 5a5.5 5.5 0 00-8 0L1.5 3.5zm-1.5-1.5a11.5 11.5 0 0114 0L12.5 3.5a9.5 9.5 0 00-11 0L0 2z" />
            </svg>
            {/* Battery Icon */}
            <svg width="18" height="10" viewBox="0 0 18 10" fill="currentColor">
              <rect x="0" y="0" width="15" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
              <rect x="2" y="2" width="10" height="6" rx="0.5" />
              <path d="M16 3h1v4h-1z" />
            </svg>
          </div>
        </div>

        {/* Device Content */}
        <div className="android-content">
          {children}
        </div>

        {/* Soft Navbar Pill */}
        <div className="android-navbar-bottom">
          <div className="android-home-pill"></div>
        </div>
      </div>
    </div>
  );
}
