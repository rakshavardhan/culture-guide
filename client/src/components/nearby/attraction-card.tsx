import { MapPin, Navigation, Star, ExternalLink, Orbit } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AttractionProps = {
  attraction: {
    id: string;
    name: string;
    description: string;
    image: string;
    distance: number; // in km
    rating: number;
    category: string;
    address: string;
    url?: string;
    hasAR?: boolean;
  };
};

export default function AttractionCard({ attraction }: AttractionProps) {
  const [, navigate] = useLocation();

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  // Some attractions with historical/cultural significance will have AR features
  // In a real app, this would be determined by the backend
  const hasARExperience = attraction.hasAR || ['Heritage', 'Spiritual', 'Museum'].includes(attraction.category);

  return (
    <div className="bg-white dark:bg-navy rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-300 transform hover:-translate-y-1">
      <div className="h-48 relative overflow-hidden">
        <img 
          src={attraction.image} 
          alt={attraction.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <Badge className="bg-olive dark:bg-gold text-white dark:text-navy">
            {attraction.category}
          </Badge>

          {hasARExperience && (
            <Badge className="bg-black/70 text-white border border-gold flex items-center gap-1">
              <Orbit className="h-3 w-3" />
              AR Available
            </Badge>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair font-bold text-xl">{attraction.name}</h3>
          <div className="flex items-center text-gold">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-semibold">{attraction.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {attraction.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{attraction.address}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center text-olive dark:text-gold font-medium">
            <Navigation className="h-4 w-4 mr-1" />
            {formatDistance(attraction.distance)}
          </span>

          <div className="flex space-x-2">
            {hasARExperience && (
              <Button 
                variant="default" 
                size="sm" 
                className="bg-olive dark:bg-gold text-white dark:text-navy flex items-center"
                onClick={() => navigate(`/ar/${attraction.id}`)}
              >
                <Orbit className="h-4 w-4 mr-1" />
                View in AR
              </Button>
            )}

            <Button 
              variant="outline" 
              size="sm" 
              className="text-olive dark:text-gold border-olive dark:border-gold"
              onClick={() => {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.name + ' ' + attraction.address)}`;
                window.open(googleMapsUrl, '_blank');
              }}
            >
              Directions
            </Button>

            {attraction.url && (
              <Button 
                variant="outline" 
                size="sm"
                className="text-olive dark:text-gold border-olive dark:border-gold"
                onClick={() => window.open(attraction.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Visit website</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}