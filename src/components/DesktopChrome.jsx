import React from 'react';

export default function DesktopChrome({ children, theme, toggleTheme }) {
  return (
    <div className="desktop-simulator-frame">
      <div className="windows-window">
        {/* Windows Titlebar */}
        <div className="windows-titlebar">
          <div className="win-title-left">
            <span className="brand-icon">J</span>
            <span>JobSphere AI - Career Operating System (Windows Desktop App)</span>
          </div>
          <div className="win-controls-right">
            <div className="win-control-icon" title="Minimize">
              <svg width="10" height="1" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="10" y2="0.5" stroke="currentColor" />
              </svg>
            </div>
            <div className="win-control-icon" title="Maximize">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="9" height="9" stroke="currentColor" />
              </svg>
            </div>
            <div className="win-control-icon close-btn" title="Close">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Client Area */}
        <div className="windows-content">
          {children}
        </div>
      </div>
    </div>
  );
}
