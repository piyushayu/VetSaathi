"use client";
import React from 'react';

export default function AnimatedBtn1({ text = "Button", variant = "solid", onClick }) {
  const isTransparent = variant === "transparent";

  return (
    <div className="flex items-center justify-center">
      <button 
        className={`bubbleeffectbtn ${isTransparent ? 'btn-transparent' : 'btn-solid'}`} 
        type="button"
        onClick={onClick}
      >
        <style jsx>{`
          .bubbleeffectbtn {
            min-width: 96px;
            height: 36px;
            color: #fff;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            outline: none;
            border-radius: 20px;
            z-index: 1;
            overflow: hidden;
            font-size: 0.875rem; /* text-sm */
            font-weight: 500;
          }

          /* Solid variant styles */
          .btn-solid {
            border: none;
            background: linear-gradient(45deg, #2a2b30, #1e1f22); /* Charcoal/Greyish */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .btn-solid:after {
            background: linear-gradient(45deg, #3a3b40, #2b2d31);
          }

          /* Transparent variant styles */
          .btn-transparent {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: none;
          }
          .btn-transparent:after {
            background: rgba(255, 255, 255, 0.08);
          }

          .bubbleeffectbtn:before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0)
            );
            transform: rotate(45deg);
            transition: all 0.5s ease;
            z-index: -1;
          }

          .bubbleeffectbtn:hover:before {
            top: -100%;
            left: -100%;
          }

          .bubbleeffectbtn:after {
            border-radius: 20px;
            position: absolute;
            content: '';
            width: 0;
            height: 100%;
            top: 0;
            z-index: -1;
            transition: all 0.3s ease;
            right: 0;
          }

          .btn-solid:after {
            box-shadow:
              inset 2px 2px 2px 0px rgba(255, 255, 255, 0.4),
              7px 7px 20px 0px rgba(0, 0, 0, 0.1),
              4px 4px 5px 0px rgba(0, 0, 0, 0.1);
          }

          .bubbleeffectbtn:hover:after {
            width: 100%;
            left: 0;
          }

          .bubbleeffectbtn:active {
            top: 1px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .btn-solid:active {
            background: linear-gradient(45deg, #1e1f22, #111214);
          }
          .btn-transparent:active {
            background: rgba(255, 255, 255, 0.04);
          }

          .bubbleeffectbtn span {
            position: relative;
            z-index: 2;
          }
        `}</style>

        <span className="text-sm font-medium">{text}</span>
      </button>
    </div>
  );
}