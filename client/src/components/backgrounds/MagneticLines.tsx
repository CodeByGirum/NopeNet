export default function MagneticLines() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-cyber-dark opacity-30">
        <div className="h-full w-full relative overflow-hidden">
          {/* Horizontal lines */}
          <div className="absolute inset-0 flex flex-col justify-around opacity-20">
            <div className="h-px bg-neon-green shadow-lg shadow-neon-green/50"></div>
            <div className="h-px bg-neon-green shadow-lg shadow-neon-green/50 translate-x-10"></div>
            <div className="h-px bg-neon-green shadow-lg shadow-neon-green/50 -translate-x-20"></div>
            <div className="h-px bg-neon-green shadow-lg shadow-neon-green/50 translate-x-5"></div>
            <div className="h-px bg-neon-green shadow-lg shadow-neon-green/50 -translate-x-10"></div>
          </div>
          
          {/* Vertical lines */}
          <div className="absolute inset-0 flex justify-around opacity-20">
            <div className="w-px bg-neon-green shadow-lg shadow-neon-green/50"></div>
            <div className="w-px bg-neon-green shadow-lg shadow-neon-green/50 translate-y-20"></div>
            <div className="w-px bg-neon-green shadow-lg shadow-neon-green/50 -translate-y-10"></div>
            <div className="w-px bg-neon-green shadow-lg shadow-neon-green/50 translate-y-5"></div>
            <div className="w-px bg-neon-green shadow-lg shadow-neon-green/50 -translate-y-15"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
