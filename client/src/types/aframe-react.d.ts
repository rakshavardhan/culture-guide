declare module 'aframe-react' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface EntityProps {
    [key: string]: any;
    children?: ReactNode;
  }
  
  export interface SceneProps {
    [key: string]: any;
    children?: ReactNode;
  }
  
  export const Entity: ComponentType<EntityProps>;
  export const Scene: ComponentType<SceneProps>;
}