export default function NoiseBackground() {
  return (
    <div className="absolute inset-0 opacity-5 mix-blend-overlay">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white via-gray-500 to-black bg-fixed" 
        style={{ 
          backgroundSize: '200px',
          filter: 'contrast(170%) brightness(100%)' 
        }}
      ></div>
    </div>
  );
}
