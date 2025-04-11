import { Star } from "lucide-react";
import { Link } from "wouter";

type DestinationProps = {
  destination: {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: number;
    tags: string[];
  };
};

export default function DestinationCard({ destination }: DestinationProps) {
  return (
    <div className="bg-ivory dark:bg-navy rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-300 transform hover:-translate-y-2 animate-on-scroll">
      <div className="h-48 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair font-bold text-xl">{destination.name}</h3>
          <span className="bg-skyblue dark:bg-gold px-2 py-1 rounded text-xs">
            {destination.tags[0]}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-olive dark:text-gold font-semibold flex items-center">
            {destination.rating} 
            <Star className="h-4 w-4 ml-1 fill-current" />
          </span>
          <Link href={`/explore?id=${destination.id}`} className="text-olive dark:text-gold hover:underline transition-300">
            Explore <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
