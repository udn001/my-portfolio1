"use client";

import React from "react";

export default function F1CarAnimation() {
  return (
    <div className="f1-car-container">
      <div className="f1-car">
        {/* Simple F1 car representation using SVG */}
        <svg
          width="200"
          height="60"
          viewBox="0 0 200 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Exhaust Flame (animated) */}
          <path
            className="exhaust-flame"
            d="M 25 35 Q -10 35, 10 40 Q -10 45, 25 45 Z"
            fill="#ff4500"
          />

          {/* Rear Wing */}
          <rect x="25" y="10" width="30" height="15" rx="2" fill="#111" />
          <path d="M 40 25 L 50 40 L 40 40 Z" fill="#333" />
          
          {/* Main Body */}
          <path
            d="M 20 40 L 40 30 L 120 30 L 150 40 L 180 45 L 180 50 L 20 50 Z"
            fill="#DC0000" /* Ferrari-like red */
          />
          
          {/* Cockpit / Halo */}
          <path d="M 80 30 Q 95 15 110 30 Z" fill="#111" />
          
          {/* Front Wing */}
          <path d="M 150 45 L 195 45 L 195 50 L 150 50 Z" fill="#111" />
          
          {/* Rear Wheel (Spinning) */}
          <g className="wheel">
            <circle cx="50" cy="45" r="15" fill="#111" />
            <circle cx="50" cy="45" r="7" fill="#ccc" />
            <circle cx="50" cy="45" r="3" fill="#ee0000" />
            {/* Spokes / Detail to show rotation */}
            <line x1="50" y1="30" x2="50" y2="60" stroke="#ccc" strokeWidth="2" opacity="0.3" />
            <line x1="35" y1="45" x2="65" y2="45" stroke="#ccc" strokeWidth="2" opacity="0.3" />
          </g>

          {/* Front Wheel (Spinning) */}
          <g className="wheel front-wheel">
            <circle cx="155" cy="45" r="15" fill="#111" />
            <circle cx="155" cy="45" r="7" fill="#ccc" />
            <circle cx="155" cy="45" r="3" fill="#ee0000" />
            <line x1="155" y1="30" x2="155" y2="60" stroke="#ccc" strokeWidth="2" opacity="0.3" />
            <line x1="140" y1="45" x2="170" y2="45" stroke="#ccc" strokeWidth="2" opacity="0.3" />
          </g>
        </svg>

        {/* Speed lines */}
        <div className="speed-lines">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
      </div>

      <style jsx>{`
        .f1-car-container {
          position: fixed;
          bottom: 20px;
          left: -250px; /* Start off-screen */
          z-index: 9999;
          pointer-events: none; /* Let clicks pass through */
          animation: driveAcross 10s linear infinite;
        }

        /* Responsive positioning */
        @media (max-width: 768px) {
          .f1-car-container {
            bottom: 10px;
            transform: scale(0.7); /* Scale down for mobile */
          }
        }

        .f1-car {
          position: relative;
          display: flex;
          align-items: center;
          /* Subtle bounce for the body */
          animation: bounce 0.3s ease-in-out infinite alternate;
        }

        .wheel {
          transform-origin: center;
          /* Explicit origins */
        }
        
        .wheel circle, .wheel line {
          transform-origin: 50px 45px;
          animation: spin 0.2s linear infinite;
        }

        .front-wheel circle, .front-wheel line {
          transform-origin: 155px 45px;
        }

        .exhaust-flame {
          transform-origin: 25px 40px;
          animation: flicker 0.1s infinite alternate;
        }

        .speed-lines {
          position: absolute;
          left: -100px;
          width: 80px;
          height: 30px;
          overflow: hidden;
        }

        .line {
          height: 2px;
          background: rgba(255, 255, 255, 0.4);
          position: absolute;
          border-radius: 2px;
          animation: dash 0.5s linear infinite;
        }

        .line-1 { top: 10px; width: 40px; animation-duration: 0.3s; }
        .line-2 { top: 20px; width: 60px; animation-duration: 0.4s; animation-delay: 0.1s; }
        .line-3 { top: 30px; width: 30px; animation-duration: 0.2s; animation-delay: 0.2s; }

        @keyframes driveAcross {
          0% {
            left: -250px;
          }
          10% {
            left: -250px; /* Delay before starting to drive */
          }
          90% {
            left: 110vw;
          }
          100% {
            left: 110vw; /* Stay off-screen to wait for the loop */
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(2px);
          }
        }

        @keyframes flicker {
          from {
            transform: scaleX(0.8) scaleY(0.9);
            opacity: 0.7;
          }
          to {
            transform: scaleX(1.3) scaleY(1.1);
            opacity: 1;
            fill: #ffe100ea;
          }
        }

        @keyframes dash {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
