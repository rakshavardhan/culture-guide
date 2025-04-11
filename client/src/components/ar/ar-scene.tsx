import { useEffect, useRef } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';

type ARSceneProps = {
  siteId: string;
};

export default function ARScene({ siteId }: ARSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  
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
    document.body.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // This effect loads models and assets specific to the current site
  useEffect(() => {
    if (!siteId) return;
    
    // In a real app, here we would:
    // 1. Load 3D models specific to the current cultural site
    // 2. Set up position tracking relative to markers or GPS
    // 3. Configure any site-specific AR behaviors
    
    console.log(`Loading AR content for site: ${siteId}`);
    
    // Cleanup function
    return () => {
      console.log(`Unloading AR content for site: ${siteId}`);
    };
  }, [siteId]);

  return (
    <Scene
      ref={sceneRef}
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
      renderer="logarithmicDepthBuffer: true;"
      vr-mode-ui="enabled: false"
      gesture-detector
      id="ar-scene"
    >
      {/* Default camera with AR.js settings */}
      <Entity
        camera
        position="0 0 0"
        look-controls="enabled: false"
        arjs-device-orientation-controls="smoothingFactor: 0.8"
        cursor="fuse: false; rayOrigin: mouse;"
        raycaster="objects: .clickable"
      />
      
      {/* For Taj Mahal - this would be replaced with a dynamic system */}
      {siteId === "taj-mahal" && (
        <>
          {/* A marker-based entity */}
          <Entity
            material="color: white; opacity: 0.8"
            position="0 0.5 -1"
            rotation="0 0 0"
            scale="0.5 0.5 0.5"
            className="clickable"
            geometry="primitive: box"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear"
            text="value: Taj Mahal; align: center; width: 3; color: black"
          />
          
          {/* In a real app, we would use a detailed 3D model instead of primitives */}
          <Entity
            material="color: white; src: #taj-texture"
            position="0 0 -2"
            scale="1 1 1"
            geometry="primitive: cone"
            className="clickable"
          />
        </>
      )}
      
      {/* Generic historical marker for other sites */}
      {siteId !== "taj-mahal" && (
        <Entity
          material="color: gold; opacity: 0.9"
          position="0 0.5 -1"
          geometry="primitive: sphere"
          className="clickable"
          animation="property: position; to: 0 0.7 -1; dir: alternate; dur: 1000; loop: true"
          text="value: Historical Site; align: center; width: 2; color: black"
        />
      )}
        
      {/* Ambient light */}
      <Entity light="type: ambient; color: #FFF; intensity: 0.8" />
      
      {/* Directional light */}
      <Entity light="type: directional; color: #FFF; intensity: 0.6" position="-1 1 0" />
      
      {/* Assets management system */}
      <Entity primitive="a-assets">
        <img id="taj-texture" src="https://i.imgur.com/mYmmbrp.jpg" />
      </Entity>
    </Scene>
  );
}