import { useEffect, useRef, useState } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import attractions from '@/data/attractions';

type ARSceneProps = {
  siteId: string;
};

export default function ARScene({ siteId }: ARSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const [arLoaded, setArLoaded] = useState(false);
  const [siteName, setSiteName] = useState('Cultural Site');
  
  // This effect handles AR.js initialization
  useEffect(() => {
    // In a real implementation, we would:
    // 1. Load AR.js with appropriate markers
    // 2. Initialize the AR context
    // 3. Handle device orientation/motion permissions
    
    // Load AR.js script
    const script = document.createElement('script');
    script.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
    script.async = true;
    
    script.onload = () => {
      console.log('AR.js script loaded');
      setArLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load AR.js');
      // Fallback to non-AR mode
      setArLoaded(true);
    };
    
    document.body.appendChild(script);
    
    // Request device motion/orientation permissions (needed for AR on iOS)
    if (typeof DeviceMotionEvent !== 'undefined' && 
        typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      // iOS 13+ requires permission
      document.body.addEventListener('click', () => {
        (DeviceMotionEvent as any).requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              console.log('Device motion permission granted');
            }
          })
          .catch(console.error);
      }, { once: true });
    }
    
    // Cleanup on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  // This effect loads site data
  useEffect(() => {
    if (!siteId) return;
    
    // For AR sites list
    if (siteId === 'taj-mahal' || siteId === 'machu-picchu' || siteId === 'angkor-wat') {
      // These are the predefined AR sites
      setSiteName(siteId === 'taj-mahal' ? 'Taj Mahal' : 
                 siteId === 'machu-picchu' ? 'Machu Picchu' : 'Angkor Wat');
    } else {
      // Try to find from attractions
      const attraction = attractions.find(a => a.id === siteId);
      if (attraction) {
        setSiteName(attraction.name);
      }
    }
    
    console.log(`Loading AR content for site: ${siteId}`);
    
    // Cleanup function
    return () => {
      console.log(`Unloading AR content for site: ${siteId}`);
    };
  }, [siteId]);

  // Create a simpler AR scene that is more likely to work across devices
  return (
    <Scene
      ref={sceneRef}
      embedded
      renderer="antialias: true; alpha: true; logarithmicDepthBuffer: true;"
      vr-mode-ui="enabled: false"
      id="ar-scene"
      className="w-full h-full"
    >
      {/* Camera */}
      <Entity
        camera
        position="0 1.6 0"
        look-controls="pointerLockEnabled: false; touchEnabled: true;"
        wasd-controls="enabled: false;"
      />
      
      {/* Site-specific 3D content */}
      {siteId === "taj-mahal" && (
        <>
          <Entity
            material="color: white; opacity: 0.8"
            position="0 0 -3"
            rotation="0 0 0"
            scale="0.7 0.7 0.7"
            className="clickable"
            geometry="primitive: box"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear"
          />
          <Entity
            position="0 1.2 -3"
            text={{value: "Taj Mahal", align: "center", width: 5, color: "white", wrapCount: 20}}
          />
          <Entity
            position="0 0.8 -3"
            text={{value: "17th Century Mughal Architecture", align: "center", width: 3, color: "white", wrapCount: 30}}
          />
        </>
      )}
      
      {siteId === "attr1" && (
        <>
          <Entity
            material="color: #f5f5dc; opacity: 0.9"
            position="0 0 -3"
            rotation="0 0 0"
            scale="0.5 0.8 0.5"
            className="clickable"
            geometry="primitive: box"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 12000; easing: linear"
          />
          <Entity
            position="0 1.2 -3"
            text={{value: siteName, align: "center", width: 5, color: "white", wrapCount: 20}}
          />
          <Entity
            position="0 0.8 -3"
            text={{value: "12th Century Heritage Site", align: "center", width: 3, color: "white", wrapCount: 30}}
          />
        </>
      )}
      
      {siteId === "attr2" && (
        <>
          <Entity
            material="color: #8b4513; opacity: 0.9"
            position="0 0 -3"
            scale="0.7 0.7 0.7"
            className="clickable"
            geometry="primitive: cylinder"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 15000; easing: linear"
          />
          <Entity
            position="0 1.2 -3"
            text={{value: siteName, align: "center", width: 5, color: "white", wrapCount: 20}}
          />
          <Entity
            position="0 0.8 -3"
            text={{value: "Museum with 2,000+ Year Old Artifacts", align: "center", width: 3, color: "white", wrapCount: 30}}
          />
        </>
      )}
      
      {siteId === "attr8" && (
        <>
          <Entity
            material="color: #d4af37; opacity: 0.9"
            position="0 0 -3"
            rotation="0 0 0"
            scale="1 0.1 1"
            className="clickable"
            geometry="primitive: circle"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
          />
          <Entity
            position="0 1.2 -3"
            text={{value: siteName, align: "center", width: 5, color: "white", wrapCount: 20}}
          />
          <Entity
            position="0 0.8 -3"
            text={{value: "Historical Ceremonial Ground", align: "center", width: 3, color: "white", wrapCount: 30}}
          />
        </>
      )}
      
      {/* Generic model for other site IDs */}
      {(siteId !== "taj-mahal" && siteId !== "attr1" && siteId !== "attr2" && siteId !== "attr8") && (
        <>
          <Entity
            material="color: gold; opacity: 0.9"
            position="0 0 -3"
            geometry="primitive: sphere"
            className="clickable"
            animation="property: position; to: 0 0.2 -3; dir: alternate; dur: 2000; loop: true"
          />
          <Entity
            position="0 1.2 -3"
            text={{value: siteName, align: "center", width: 5, color: "white", wrapCount: 20}}
          />
          <Entity
            position="0 0.8 -3"
            text={{value: "Cultural Heritage Site", align: "center", width: 3, color: "white", wrapCount: 30}}
          />
        </>
      )}
        
      {/* Lighting */}
      <Entity light="type: ambient; color: #FFF; intensity: 0.8" />
      <Entity light="type: directional; color: #FFF; intensity: 0.6" position="-1 1 0" />
      
      {/* Environment */}
      <Entity
        primitive="a-sky"
        color="#000033"
        opacity="0.8"
      />
    </Scene>
  );
}