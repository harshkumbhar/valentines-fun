
import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import ValentineCard from './components/ValentineCard';
import { ValentineState } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<ValentineState>(ValentineState.ASKING);

  const handleAccept = () => {
    setStatus(ValentineState.ACCEPTED);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-rose-50 select-none">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-white to-pink-100 z-0"></div>
      
      {/* Animated Floating Hearts Background */}
      <FloatingHearts />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <ValentineCard onAccept={handleAccept} status={status} />
        
        {/* Footer Credit */}
        <footer className="mt-12 text-rose-300 text-sm font-light tracking-widest uppercase pointer-events-none">
          Made with love &hearts;
        </footer>
      </main>

      {/* Corner Decorations */}
      <div className="fixed top-0 left-0 p-8 opacity-20 pointer-events-none hidden md:block">
        <div className="text-6xl animate-pulse">🌸</div>
      </div>
      <div className="fixed bottom-0 right-0 p-8 opacity-20 pointer-events-none hidden md:block">
        <div className="text-6xl animate-pulse delay-700">🌺</div>
      </div>
    </div>
  );
};

export default App;
