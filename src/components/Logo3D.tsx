import React from 'react';

const Logo3D: React.FC = () => {
  return (
    <div className="w-full h-96 relative flex items-center justify-center">
      {/* Animated geometric shapes with pure CSS */}
      <div className="relative">
        {/* Floating cube */}
        <div className="w-16 h-16 bg-white/10 border border-white/20 transform rotate-45 animate-pulse absolute -translate-x-8 -translate-y-8">
        </div>
        
        {/* Floating circle */}
        <div className="w-20 h-20 border-2 border-white/30 rounded-full absolute translate-x-12 -translate-y-4 animate-pulse animation-delay-1000">
        </div>
        
        {/* Central element */}
        <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 border border-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <span className="text-white font-bold text-2xl">C</span>
        </div>
        
        {/* Additional floating elements */}
        <div className="w-8 h-8 bg-white/20 rounded-full absolute -translate-x-16 translate-y-8 animate-pulse animation-delay-2000">
        </div>
        
        <div className="w-12 h-12 border border-white/40 transform rotate-12 absolute translate-x-20 translate-y-6 animate-pulse animation-delay-3000">
        </div>
      </div>
      
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent rounded-full blur-xl">
      </div>
    </div>
  );
};

export default Logo3D;