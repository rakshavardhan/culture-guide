import React from 'react';
import { X, Clock, BookOpen, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Site = {
  id: string;
  name: string;
  description: string;
  culturalInfo: string;
  historicalDetails: string;
  year: string;
};

type ARInfoOverlayProps = {
  site: Site;
  onClose: () => void;
};

export default function ARInfoOverlay({ site, onClose }: ARInfoOverlayProps) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-20 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-navy rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 bg-olive dark:bg-gold text-white dark:text-navy flex justify-between items-center">
          <h3 className="text-xl font-bold font-playfair">{site.name}</h3>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white dark:text-navy hover:bg-olive-light dark:hover:bg-gold-light"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-3 p-0 bg-gray-100 dark:bg-navy-light">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="culture">Cultural</TabsTrigger>
            <TabsTrigger value="history">Historical</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="p-4 m-0">
              <div className="mb-4">
                <img 
                  src={`https://source.unsplash.com/800x600/?historical,${encodeURIComponent(site.name)}`} 
                  alt={site.name} 
                  className="w-full h-40 object-cover rounded-lg" 
                  onError={(e) => {
                    // Fallback image if Unsplash fails
                    e.currentTarget.src = "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
                  }}
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {site.description}
              </p>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                <Clock className="h-4 w-4 mr-2" />
                <span>Built: {site.year}</span>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline"
                  className="w-full border-olive dark:border-gold text-olive dark:text-gold"
                >
                  <Map className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="culture" className="p-4 m-0">
              <div className="space-y-4">
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 rounded-full bg-skyblue/20 dark:bg-gold/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-olive dark:text-gold" />
                  </div>
                  <h4 className="text-lg font-bold font-playfair">Cultural Significance</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {site.culturalInfo}
                </p>
                
                <div className="bg-gray-100 dark:bg-navy-light p-3 rounded-lg mt-4">
                  <h5 className="font-medium mb-2">Cultural AR Experience</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Point your camera at the site to see historical overlays showing how cultural practices 
                    and traditions were performed here throughout history.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="p-4 m-0">
              <div className="space-y-4">
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 rounded-full bg-terracotta/20 dark:bg-gold/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <Clock className="h-5 w-5 text-olive dark:text-gold" />
                  </div>
                  <h4 className="text-lg font-bold font-playfair">Historical Context</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {site.historicalDetails}
                </p>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 mt-4">
                  <h5 className="font-medium mb-2">Time Travel in AR</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use our AR time slider to see how this site has changed through different historical periods.
                    Experience the evolution of architecture and cultural significance.
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}