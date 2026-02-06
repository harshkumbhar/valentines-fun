
import React, { useEffect, useState } from 'react';

// Added HeartProps interface to properly type the Heart component
interface HeartProps {
  delay: number;
  left: number;
  size: number;
}

// Use React.FC to ensure intrinsic props like 'key' are correctly handled by TypeScript
const Heart: React.FC<HeartProps> = ({ delay, left, size }) => (
  <div
    className="absolute bottom-[-100px] animate-float opacity-30 text-rose-300 pointer-events-none"
    style={{
      left: `${left}%`,
      fontSize: `${size}px`,
      animation: `float 10s linear infinite ${delay}s`,
    }}
  >
    ❤
  </div>
);

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; delay: number; left: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      left: Math.random() * 100,
      size: Math.random() * 20 + 20,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
          }
          .animate-float {
            animation-timing-function: linear;
          }
        `}
      </style>
      {hearts.map((h) => (
        <Heart key={h.id} delay={h.delay} left={h.left} size={h.size} />
      ))}
    </div>
  );
};

export default FloatingHearts;
