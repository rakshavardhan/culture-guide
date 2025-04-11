import { useState } from 'react';
import { useLocation } from 'wouter';
import { Orbit as Cube, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define the type for historical/cultural sites with AR features
type ARSite = {
  id: string;
  name: string;
  description: string;
  distance: number;
  rating: number;
  image: string;
  hasAR: boolean;
  location: string;
};

type ARSitesListProps = {
  className?: string;
};

export default function ARSitesList({ className = '' }: ARSitesListProps) {
  const [, navigate] = useLocation();
  
  // In a real app, this data would come from an API
  const [arSites] = useState<ARSite[]>([
    {
      id: "taj-mahal",
      name: "Taj Mahal",
      description: "Experience the Taj Mahal in AR and learn about its cultural significance.",
      distance: 1.2,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      hasAR: true,
      location: "Agra, India"
    },
    {
      id: "machu-picchu",
      name: "Machu Picchu",
      description: "Explore the ancient Inca citadel with AR reconstructions of historical structures.",
      distance: 2.3,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      hasAR: true,
      location: "Cusco Region, Peru"
    },
    {
      id: "angkor-wat",
      name: "Angkor Wat",
      description: "Discover the lost civilization of the Khmer Empire with immersive AR tours.",
      distance: 3.5,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      hasAR: true,
      location: "Siem Reap, Cambodia"
    }
  ]);

  const handleOpenAR = (siteId: string) => {
    navigate(`/ar/${siteId}`);
  };

  return (
    <div className={`space-y-5 ${className}`}>
      <h3 className="text-xl font-playfair font-bold flex items-center">
        <Cube className="h-5 w-5 mr-2 text-olive dark:text-gold" />
        Sites with AR Experience
      </h3>
      
      <div className="space-y-4">
        {arSites.map(site => (
          <div 
            key={site.id}
            className="bg-white dark:bg-navy border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col md:flex-row"
          >
            <div className="md:w-1/3 h-48 md:h-auto relative">
              <img 
                src={site.image} 
                alt={site.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Cube className="h-3 w-3 mr-1" />
                AR Available
              </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg mb-1">{site.name}</h4>
                  <div className="flex items-center text-gold">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm">{site.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {site.location} · {site.distance} km away
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {site.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  className="text-sm border-gray-300 dark:border-gray-600"
                  onClick={() => navigate(`/nearby?site=${site.id}`)}
                >
                  Details
                </Button>
                
                <Button 
                  className="text-sm bg-olive dark:bg-gold text-white dark:text-navy"
                  onClick={() => handleOpenAR(site.id)}
                >
                  <Cube className="h-4 w-4 mr-1" />
                  Launch AR Experience
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}