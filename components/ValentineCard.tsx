
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ValentineState, Position } from '../types';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

interface ValentineCardProps {
  onAccept: () => void;
  status: ValentineState;
}

const ValentineCard: React.FC<ValentineCardProps> = ({ onAccept, status }) => {
  const [noButtonPos, setNoButtonPos] = useState<Position | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback(() => {
    if (status === ValentineState.ACCEPTED) return;

    const padding = 40;
    const btnWidth = noButtonRef.current?.offsetWidth || 100;
    const btnHeight = noButtonRef.current?.offsetHeight || 44;
    
    // We want to move it anywhere in the viewport, but keep it visible
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
  
    const newX = (Math.random() * maxX) * 0.5;
    const newY = (Math.random() * maxY) * 0.5;


    setNoButtonPos({ x: newX, y: newY });
  }, [status]);

  const handleYesClick = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ffffff', '#ff1493']
    });
    onAccept();
  };

  const currentNoStyle: React.CSSProperties = noButtonPos ? {
    position: 'fixed',
    left: `${noButtonPos.x}px`,
    top: `${noButtonPos.y}px`,
    transition: 'all 0.2s ease-out',
    zIndex: 50
  } : {
    position: 'relative'
  };

  return (
    <div 
      ref={cardRef}
      className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-rose-100 text-center max-w-lg w-full mx-4 transition-all duration-700 transform hover:scale-[1.02] z-10"
    >
      {status === ValentineState.ASKING ? (
        <>
          <div className="mb-6">
            <img 
              src="../assets/image.jpeg" 
              alt="Cute cat" 
              className="mx-auto w-48 h-48 object-contain rounded-full border-4 border-rose-200 p-2 bg-white"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-cursive text-rose-600 mb-8 leading-tight">
            Will you be my Valentine?
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <button
              onClick={handleYesClick}
              className="px-10 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xl font-bold shadow-lg hover:shadow-rose-300/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              Yes! 💖
            </button>
            <button
              ref={noButtonRef}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={currentNoStyle}
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-lg font-medium shadow-sm transition-all duration-200"
            >
              No
            </button>
          </div>
        </>
      ) : (
        <div className="animate-in fade-in zoom-in duration-500">
          <div className="mb-6">
            <img 
              src="../assets/happy-cat.gif"
              alt="Happy cat" 
              className="mx-auto w-48 h-48 object-contain rounded-full border-4 border-rose-200 p-2 bg-white"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-cursive text-rose-600 mb-4">
            Yay! 🌻
          </h1>
          <p className="text-rose-400 text-xl font-medium mb-2">I knew you'd say yes!</p>
          <div className="text-3xl mt-6 animate-bounce">
            💑 ❤️ 💍
          </div>
        </div>
      )}
    </div>
  );
};

export default ValentineCard;
