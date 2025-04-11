import { useState, useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { MapPin, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AttractionCard from "@/components/nearby/attraction-card";
import ARSitesList from "@/components/ar/ar-sites-list";
import { getNearbyAttractions } from "@/data/attractions";

type Attraction = {
  id: string;
  name: string;
  description: string;
  image: string;
  distance: number;
  rating: number;
  category: string;
  address: string;
  url?: string;
};

export default function Nearby() {
  const { position, error, loading, startWatching, stopWatching, isWatching } = useGeolocation();
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoadingAttractions, setIsLoadingAttractions] = useState(false);

  useEffect(() => {
    // When position changes, fetch nearby attractions
    if (position) {
      fetchNearbyAttractions();
    }
  }, [position]);

  const fetchNearbyAttractions = async () => {
    if (!position) return;
    
    setIsLoadingAttractions(true);
    
    try {
      // In a real app, this would be an API call with the coordinates
      // For now, we're using mock data from the attractions data file
      const nearbyAttractions = await getNearbyAttractions(position.latitude, position.longitude);
      setAttractions(nearbyAttractions);
    } catch (error) {
      console.error("Error fetching nearby attractions:", error);
    } finally {
      setIsLoadingAttractions(false);
    }
  };

  const refreshLocation = () => {
    if (isWatching) {
      stopWatching();
    }
    startWatching();
  };

  return (
    <div className="bg-gray-100 dark:bg-navy-light min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-6">
          Nearby Cultural Attractions
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Discover cultural treasures near your current location. Allow location access to see what's around you.
        </p>
        
        {/* Location Status */}
        <div className="max-w-4xl mx-auto mb-10">
          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-300">Location Error</h3>
                <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
                <Button 
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                  onClick={refreshLocation}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            </div>
          ) : loading ? (
            <div className="bg-white dark:bg-navy rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <div className="w-8 h-8 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-medium mb-2">Getting Your Location</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Please wait while we access your current position...
              </p>
            </div>
          ) : position ? (
            <div className="bg-white dark:bg-navy rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Location Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Showing cultural attractions near you
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="border-olive dark:border-gold text-olive dark:text-gold"
                  onClick={refreshLocation}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-navy rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-4">
                <MapPin className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Location Access Required</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Allow access to your location to discover nearby cultural attractions.
              </p>
              <Button 
                className="bg-olive dark:bg-gold text-white dark:text-navy"
                onClick={refreshLocation}
              >
                Share My Location
              </Button>
            </div>
          )}
        </div>
        
        {/* Map Section - Static map visualization */}
        {position && (
          <div className="max-w-4xl mx-auto mb-10 rounded-xl overflow-hidden shadow-lg">
            <div className="relative w-full h-[400px] bg-gray-100 dark:bg-navy-light">
              {/* Static map visualization with position indicator */}
              <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20">
                {/* Grid lines */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }}></div>
                
                {/* Center position indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 animate-ping"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">You</span>
                  </div>
                </div>
                
                {/* Random attraction markers */}
                {[...Array(6)].map((_, i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  const distance = 100 + Math.random() * 100;
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance;
                  
                  return (
                    <div 
                      key={i} 
                      className="absolute w-5 h-5 rounded-full bg-olive dark:bg-gold"
                      style={{
                        top: `calc(50% + ${y}px)`,
                        left: `calc(50% + ${x}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    ></div>
                  );
                })}
              </div>
              
              {/* Map overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-navy/80 p-4 rounded-lg text-center max-w-md">
                  <p className="text-lg font-medium mb-1">Interactive Map</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Current location: {position.latitude.toFixed(4)}, {position.longitude.toFixed(4)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Map shows your current location and nearby cultural attractions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* AR Sites Section */}
        {position && (
          <div className="max-w-6xl mx-auto mb-16">
            <ARSitesList className="bg-white dark:bg-navy p-6 rounded-xl shadow-md" />
          </div>
        )}
        
        <Separator className="max-w-6xl mx-auto my-12" />
        
        {/* Attractions List */}
        {position && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-playfair font-bold mb-6">Cultural Attractions Near You</h2>
            
            {isLoadingAttractions ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-navy rounded-xl overflow-hidden shadow-md animate-pulse">
                    <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="p-5 space-y-4">
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="flex justify-between pt-4">
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : attractions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {attractions.map((attraction) => (
                  <AttractionCard key={attraction.id} attraction={attraction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 mb-4">
                  <MapPin className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Attractions Found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  We couldn't find any cultural attractions near your current location. Try moving to a different area or refreshing your location.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
