import { useState, useEffect } from "react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "../ui/button";
import DestinationCard from "../common/destination-card";

type Destination = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  tags: string[];
};

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest("GET", "/api/destinations", undefined);
        const data = await response.json();
        // Take first 3 destinations
        setDestinations(data.destinations.slice(0, 3));
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load destinations");
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-navy-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-ivory dark:bg-navy rounded-xl overflow-hidden shadow-md h-96 animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-5 space-y-4">
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white dark:bg-navy-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Popular Destinations</h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-navy-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12 animate-on-scroll">Popular Destinations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/explore">
            <Button variant="outline" className="border-2 border-olive dark:border-gold text-olive dark:text-gold hover:bg-olive hover:text-white dark:hover:bg-gold dark:hover:text-navy transition-300">
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
