import { useEffect, useRef, useState } from 'react';
import attractions from '@/data/attractions';

type ARSceneProps = {
  siteId: string;
};

// This is a simplified AR experience that works across all devices without requiring AR.js
export default function ARScene({ siteId }: ARSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [siteName, setSiteName] = useState('Cultural Site');
  const [siteInfo, setSiteInfo] = useState('Historical Cultural Site');
  const [modelType, setModelType] = useState<string>('generic');
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [bouncePosition, setBouncePosition] = useState(0);
  const [bounceDirection, setBounceDirection] = useState(1);

  // This effect sets up the camera feed or falls back to a static background
  useEffect(() => {
    let isMounted = true;
    // For now, always use fallback mode to ensure AR works everywhere
    let needsFallback = true;
    
    // Set a simple message explaining the fallback mode
    setCameraError('Using AR visualization mode. Tap to interact with the model.');
    
    // Attempt camera access only for future enhancement, but don't rely on it
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('Camera not supported - using fallback mode');
    } else if (!needsFallback) { // Only attempt camera if we're not always using fallback
      // Request camera access with timeout
      const cameraPromise = navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      // Timeout after 3 seconds to prevent hanging on permission dialog
      const timeoutPromise = new Promise<MediaStream>((_, reject) => {
        setTimeout(() => reject(new Error('Camera permission timeout')), 3000);
      });
      
      Promise.race([cameraPromise, timeoutPromise])
        .then(stream => {
          if (!isMounted) return;
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            needsFallback = false;
          }
        })
        .catch(err => {
          if (!isMounted) return;
          
          console.error('Camera error:', err);
          setCameraError(`Using AR visualization mode without camera. ${err.message}`);
          needsFallback = true;
        });
    }
    
    // Handle fallback mode
    if (needsFallback) {
      // Create a gradient background instead of camera feed
      if (videoRef.current) {
        videoRef.current.style.display = 'none';
      }
      
      // Instead of DOM manipulation, let's use React's built-in background options
      if (videoRef.current) {
        videoRef.current.style.display = 'none';
      }
      
      // Add a basic CSS rule for the fallback animation directly in index.css
      if (!document.querySelector('#ar-gradient-styles')) {
        const style = document.createElement('style');
        style.id = 'ar-gradient-styles';
        style.textContent = `
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .ar-gradient-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, #001f3f, #0074D9, #111111);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            z-index: 0;
          }
        `;
        document.head.appendChild(style);
      }
      
      // Create a div programmatically as a direct child in the React component
      // This will be rendered when the component mounts
      const container = document.querySelector('.ar-scene-container');
      if (container && !container.querySelector('.ar-gradient-bg')) {
        const backgroundDiv = document.createElement('div');
        backgroundDiv.className = 'ar-gradient-bg';
        container.insertBefore(backgroundDiv, container.firstChild);
      }
    }

    // Clean up function
    return () => {
      isMounted = false;
      
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
      
      // Remove style if we added it
      try {
        const styles = document.querySelectorAll('style');
        styles.forEach(style => {
          const content = style.textContent || '';
          if (content.includes('gradientBG')) {
            document.head.removeChild(style);
          }
        });
      } catch (error) {
        console.error('Error cleaning up styles:', error);
      }
    };
  }, []);

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

  // Handle window resize to update canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Animation frame for 3D model
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Function to render the 3D model overlay
    const render = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center coordinates
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Update rotation
      if (isRotating) {
        setRotationAngle(prev => (prev + 0.5) % 360);
      }
      
      // Update bounce effect for some models
      if (modelType === 'generic' || modelType === 'spiritual') {
        setBouncePosition(prev => {
          const newPosition = prev + (0.5 * bounceDirection);
          if (newPosition > 20) setBounceDirection(-1);
          if (newPosition < -20) setBounceDirection(1);
          return newPosition;
        });
      }
      
      // Draw 3D model based on type
      ctx.save();
      ctx.translate(centerX, centerY + bouncePosition);
      ctx.rotate(rotationAngle * Math.PI / 180);
      
      // Different models based on site type
      if (modelType === 'taj-mahal') {
        // Simple Taj Mahal representation
        drawTajMahal(ctx);
      } else if (modelType === 'machu-picchu') {
        drawMachuPicchu(ctx);
      } else if (modelType === 'angkor-wat') {
        drawAngkorWat(ctx);
      } else if (modelType === 'heritage') {
        drawHeritageSite(ctx);
      } else if (modelType === 'museum') {
        drawMuseum(ctx);
      } else if (modelType === 'spiritual') {
        drawSpiritualSite(ctx);
      } else {
        // Generic cultural site
        drawGenericSite(ctx);
      }
      
      ctx.restore();
      
      // Draw site name
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(siteName, centerX, 80);
      
      // Draw site info
      ctx.font = '18px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText(siteInfo, centerX, 110);
      
      // Continue animation
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRotating, rotationAngle, bouncePosition, bounceDirection, modelType, siteName, siteInfo]);

  // Drawing functions for different models
  const drawTajMahal = (ctx: CanvasRenderingContext2D) => {
    const scale = 100;
    
    // Main dome
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(0, -scale * 0.5, scale * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Main building
    ctx.fillRect(-scale * 0.7, 0, scale * 1.4, scale * 0.8);
    
    // Minarets
    ctx.fillStyle = 'rgba(240, 240, 240, 0.6)';
    ctx.fillRect(-scale * 0.9, -scale * 0.1, scale * 0.15, scale * 0.9);
    ctx.fillRect(scale * 0.75, -scale * 0.1, scale * 0.15, scale * 0.9);
  };
  
  const drawMachuPicchu = (ctx: CanvasRenderingContext2D) => {
    const scale = 100;
    
    // Mountain
    ctx.fillStyle = 'rgba(110, 130, 100, 0.7)';
    ctx.beginPath();
    ctx.moveTo(-scale, scale * 0.5);
    ctx.lineTo(-scale * 0.5, -scale * 0.3);
    ctx.lineTo(0, -scale * 0.5);
    ctx.lineTo(scale * 0.5, -scale * 0.2);
    ctx.lineTo(scale, scale * 0.5);
    ctx.closePath();
    ctx.fill();
    
    // Ruins
    ctx.fillStyle = 'rgba(200, 200, 180, 0.8)';
    for (let i = -3; i < 4; i++) {
      ctx.fillRect(i * scale * 0.2, scale * 0.1, scale * 0.15, scale * 0.15);
    }
  };
  
  const drawAngkorWat = (ctx: CanvasRenderingContext2D) => {
    const scale = 100;
    
    // Main temple
    ctx.fillStyle = 'rgba(180, 160, 120, 0.8)';
    ctx.fillRect(-scale * 0.6, -scale * 0.1, scale * 1.2, scale * 0.6);
    
    // Center tower
    ctx.fillStyle = 'rgba(160, 140, 100, 0.8)';
    ctx.beginPath();
    ctx.moveTo(-scale * 0.2, -scale * 0.1);
    ctx.lineTo(0, -scale * 0.6);
    ctx.lineTo(scale * 0.2, -scale * 0.1);
    ctx.closePath();
    ctx.fill();
    
    // Side towers
    ctx.fillStyle = 'rgba(170, 150, 110, 0.7)';
    ctx.beginPath();
    ctx.moveTo(-scale * 0.5, -scale * 0.1);
    ctx.lineTo(-scale * 0.4, -scale * 0.4);
    ctx.lineTo(-scale * 0.3, -scale * 0.1);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(scale * 0.5, -scale * 0.1);
    ctx.lineTo(scale * 0.4, -scale * 0.4);
    ctx.lineTo(scale * 0.3, -scale * 0.1);
    ctx.closePath();
    ctx.fill();
  };
  
  const drawHeritageSite = (ctx: CanvasRenderingContext2D) => {
    const scale = 80;
    
    // Heritage building
    ctx.fillStyle = 'rgba(210, 180, 140, 0.8)';
    ctx.fillRect(-scale * 0.8, -scale * 0.2, scale * 1.6, scale * 0.7);
    
    // Roof
    ctx.fillStyle = 'rgba(160, 120, 80, 0.8)';
    ctx.beginPath();
    ctx.moveTo(-scale * 0.9, -scale * 0.2);
    ctx.lineTo(0, -scale * 0.6);
    ctx.lineTo(scale * 0.9, -scale * 0.2);
    ctx.closePath();
    ctx.fill();
    
    // Pillars
    ctx.fillStyle = 'rgba(200, 170, 130, 0.8)';
    for (let i = -3; i < 4; i += 2) {
      ctx.fillRect(i * scale * 0.2, -scale * 0.2, scale * 0.15, scale * 0.7);
    }
  };
  
  const drawMuseum = (ctx: CanvasRenderingContext2D) => {
    const scale = 80;
    
    // Museum building
    ctx.fillStyle = 'rgba(180, 160, 140, 0.8)';
    ctx.fillRect(-scale * 0.8, -scale * 0.3, scale * 1.6, scale * 0.8);
    
    // Roof/dome
    ctx.fillStyle = 'rgba(160, 140, 120, 0.8)';
    ctx.beginPath();
    ctx.ellipse(0, -scale * 0.3, scale * 0.5, scale * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Steps
    ctx.fillStyle = 'rgba(200, 180, 160, 0.8)';
    ctx.fillRect(-scale * 0.6, scale * 0.5, scale * 1.2, scale * 0.1);
    ctx.fillRect(-scale * 0.5, scale * 0.4, scale * 1.0, scale * 0.1);
    ctx.fillRect(-scale * 0.4, scale * 0.3, scale * 0.8, scale * 0.1);
    
    // Columns
    ctx.fillStyle = 'rgba(200, 180, 160, 0.8)';
    ctx.fillRect(-scale * 0.7, -scale * 0.3, scale * 0.1, scale * 0.8);
    ctx.fillRect(-scale * 0.35, -scale * 0.3, scale * 0.1, scale * 0.8);
    ctx.fillRect(scale * 0.25, -scale * 0.3, scale * 0.1, scale * 0.8);
    ctx.fillRect(scale * 0.6, -scale * 0.3, scale * 0.1, scale * 0.8);
  };
  
  const drawSpiritualSite = (ctx: CanvasRenderingContext2D) => {
    const scale = 80;
    
    // Base
    ctx.fillStyle = 'rgba(200, 200, 220, 0.7)';
    ctx.fillRect(-scale * 0.7, scale * 0.2, scale * 1.4, scale * 0.3);
    
    // Main structure
    ctx.fillStyle = 'rgba(180, 180, 200, 0.8)';
    ctx.beginPath();
    ctx.moveTo(-scale * 0.6, scale * 0.2);
    ctx.lineTo(-scale * 0.5, -scale * 0.6);
    ctx.lineTo(scale * 0.5, -scale * 0.6);
    ctx.lineTo(scale * 0.6, scale * 0.2);
    ctx.closePath();
    ctx.fill();
    
    // Symbol
    ctx.strokeStyle = 'rgba(220, 220, 240, 0.9)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, -scale * 0.2, scale * 0.2, 0, Math.PI * 2);
    ctx.stroke();
  };
  
  const drawGenericSite = (ctx: CanvasRenderingContext2D) => {
    const scale = 70;
    
    // Draw a simple abstract cultural structure
    ctx.fillStyle = 'rgba(255, 215, 0, 0.7)'; // Gold color
    ctx.beginPath();
    ctx.arc(0, 0, scale * 0.6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'rgba(220, 180, 0, 0.8)';
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x1 = Math.cos(angle) * scale * 0.6;
      const y1 = Math.sin(angle) * scale * 0.6;
      const x2 = Math.cos(angle) * scale * 1.1;
      const y2 = Math.sin(angle) * scale * 1.1;
      
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'rgba(220, 180, 0, 0.7)';
    ctx.stroke();
  };

  return (
    <div className="relative w-full h-full ar-scene-container">
      {/* Fallback background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-950 z-0"></div>
      
      {/* Camera video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.8)' }}
      />
      
      {/* Canvas overlay for AR content */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      
      {/* AR hint/info message */}
      {cameraError && (
        <div className="absolute top-5 left-0 right-0 flex justify-center">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-center max-w-xs">
            <p className="text-sm">{cameraError}</p>
          </div>
        </div>
      )}
      
      {/* Interaction element - tap to toggle rotation */}
      <div 
        className="absolute inset-0"
        onClick={() => setIsRotating(!isRotating)}
      />
    </div>
  );
}