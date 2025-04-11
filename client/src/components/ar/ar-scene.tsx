import { useEffect, useState } from 'react';
import attractions from '@/data/attractions';
import './ar-styles.css';

type ARSceneProps = {
  siteId: string;
};

// This is a simplified AR experience that works across all devices
export default function ARScene({ siteId }: ARSceneProps) {
  const [siteName, setSiteName] = useState('Cultural Site');
  const [siteInfo, setSiteInfo] = useState('Historical Cultural Site');
  const [modelType, setModelType] = useState<string>('generic');
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);

  // This effect loads site data
  useEffect(() => {
    if (!siteId) return;
    
    // For AR sites list
    if (siteId === 'taj-mahal' || siteId === 'machu-picchu' || siteId === 'angkor-wat') {
      // These are the predefined AR sites
      const name = siteId === 'taj-mahal' ? 'Taj Mahal' : 
                   siteId === 'machu-picchu' ? 'Machu Picchu' : 'Angkor Wat';
      
      const info = siteId === 'taj-mahal' ? '17th Century Mughal Architecture' : 
                   siteId === 'machu-picchu' ? '15th Century Incan Citadel' : 
                   '12th Century Khmer Temple Complex';
      
      setSiteName(name);
      setSiteInfo(info);
      setModelType(siteId);
    } else {
      // Try to find from attractions
      const attraction = attractions.find(a => a.id === siteId);
      if (attraction) {
        setSiteName(attraction.name);
        setSiteInfo(`${attraction.category} - ${attraction.address}`);
        
        // Set model type based on attraction category
        if (attraction.category === 'Heritage') {
          setModelType('heritage');
        } else if (attraction.category === 'Museum') {
          setModelType('museum');
        } else if (attraction.category === 'Spiritual') {
          setModelType('spiritual');
        } else {
          setModelType('generic');
        }
      } else {
        setModelType('generic');
      }
    }
  }, [siteId]);

  // Animation for rotation
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (isRotating) {
        setRotationAngle(prev => (prev + 0.5) % 360);
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isRotating]);

  // Simplified 3D icon based on model type
  const getModelIcon = () => {
    const baseStyle = {
      transform: `rotate(${rotationAngle}deg)`,
      transition: 'transform 0.1s ease-out',
    };
    
    // Different models based on site type
    switch(modelType) {
      case 'taj-mahal':
        return (
          <div className="w-40 h-40 bg-white/80 rounded-full flex items-center justify-center shadow-lg" style={baseStyle}>
            <div className="w-20 h-30 bg-white relative">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute -left-3 top-2 w-2 h-24 bg-white/90"></div>
              <div className="absolute -right-3 top-2 w-2 h-24 bg-white/90"></div>
            </div>
          </div>
        );
      
      case 'machu-picchu':
        return (
          <div className="w-40 h-40 flex items-center justify-center" style={baseStyle}>
            <div className="w-32 h-20 bg-green-800/70 relative" style={{clipPath: 'polygon(0 100%, 25% 30%, 50% 0, 75% 30%, 100% 100%)'}}>
              <div className="absolute bottom-1 left-4 w-5 h-5 bg-stone-300/90"></div>
              <div className="absolute bottom-3 left-12 w-5 h-5 bg-stone-300/90"></div>
              <div className="absolute bottom-1 right-4 w-5 h-5 bg-stone-300/90"></div>
            </div>
          </div>
        );
        
      case 'angkor-wat':
        return (
          <div className="w-40 h-40 flex items-center justify-center" style={baseStyle}>
            <div className="w-32 h-20 bg-amber-800/80 flex justify-center relative">
              <div className="absolute -top-10 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-amber-700/90"></div>
              <div className="absolute -left-5 -top-5 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-amber-900/90"></div>
              <div className="absolute -right-5 -top-5 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-amber-900/90"></div>
            </div>
          </div>
        );
      
      case 'heritage':
        return (
          <div className="w-40 h-40 flex items-center justify-center" style={baseStyle}>
            <div className="w-32 h-24 bg-amber-700/80 relative">
              <div className="absolute -top-8 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[16px] border-l-transparent border-r-transparent border-b-amber-900/80 left-1/2 transform -translate-x-1/2"></div>
              <div className="absolute top-0 left-4 w-3 h-24 bg-amber-600/80"></div>
              <div className="absolute top-0 right-4 w-3 h-24 bg-amber-600/80"></div>
            </div>
          </div>
        );
      
      case 'museum':
        return (
          <div className="w-40 h-40 flex items-center justify-center" style={baseStyle}>
            <div className="w-32 h-20 bg-gray-200/80 relative flex justify-center">
              <div className="absolute -top-8 w-16 h-8 bg-gray-300/80 rounded-t-full"></div>
              <div className="absolute top-0 left-4 w-2 h-20 bg-gray-400/80"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-20 bg-gray-400/80"></div>
              <div className="absolute top-0 right-4 w-2 h-20 bg-gray-400/80"></div>
            </div>
          </div>
        );
      
      case 'spiritual':
        return (
          <div className="w-40 h-40 flex items-center justify-center" style={baseStyle}>
            <div className="w-32 h-24 bg-blue-700/60 relative flex justify-center items-center">
              <div className="w-16 h-16 rounded-full border-4 border-white/80"></div>
            </div>
          </div>
        );
      
      default: // generic
        return (
          <div className="w-40 h-40 flex items-center justify-center" style={baseStyle}>
            <div className="w-24 h-24 rounded-full bg-amber-500/70 relative flex justify-center items-center">
              <div className="absolute inset-2 border-4 border-amber-400/90 rounded-full"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-16 h-1 bg-amber-400/80" 
                  style={{ transform: `rotate(${i * 45}deg) translateX(20px)` }}></div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-full ar-scene-container overflow-hidden">
      {/* Green screen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-600 to-green-900 z-0"></div>
      
      {/* Animated pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0 animate-pulse"></div>
      
      {/* Main AR content area */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
        {/* Site name header */}
        <div className="mb-8 bg-black/60 px-6 py-2 rounded-full">
          <h2 className="text-2xl font-bold text-white">{siteName}</h2>
        </div>
        
        {/* 3D model visualization area */}
        <div className="flex-1 flex items-center justify-center w-full relative">
          {getModelIcon()}
        </div>
        
        {/* Site info footer */}
        <div className="mt-auto mb-10 bg-black/60 px-4 py-2 rounded-lg max-w-xs text-center">
          <p className="text-white text-sm">{siteInfo}</p>
        </div>
        
        {/* Help text */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-white/80 text-xs animate-pulse">
            Tap anywhere to pause/resume rotation
          </p>
        </div>
      </div>
      
      {/* Interaction overlay */}
      <div 
        className="absolute inset-0 z-20 cursor-pointer"
        onClick={() => setIsRotating(!isRotating)}
      />
      
      {/* Grid pattern is defined in ar-styles.css */}
    </div>
  );
}