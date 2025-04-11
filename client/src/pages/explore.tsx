import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DestinationCard from "@/components/common/destination-card";
import { Button } from "@/components/ui/button";

type Destination = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  tags: string[];
};

type Region = "all" | "asia" | "europe" | "africa" | "americas" | "oceania";
type DestinationType = "all" | "heritage" | "spiritual" | "food" | "art" | "nature";

const regions = [
  { value: "all", label: "All Regions" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "oceania", label: "Oceania" },
];

const destinationTypes = [
  { value: "all", label: "All Types" },
  { value: "heritage", label: "Heritage" },
  { value: "spiritual", label: "Spiritual" },
  { value: "food", label: "Food" },
  { value: "art", label: "Art" },
  { value: "nature", label: "Nature" },
];

export default function Explore() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<Region>("all");
  const [typeFilter, setTypeFilter] = useState<DestinationType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const destinationsPerPage = 8;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest("GET", "/api/destinations", undefined);
        const data = await response.json();
        setDestinations(data.destinations);
        setFilteredDestinations(data.destinations);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load destinations");
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    let result = [...destinations];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        dest => 
          dest.name.toLowerCase().includes(query) || 
          dest.description.toLowerCase().includes(query) ||
          dest.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply region filter
    if (regionFilter !== "all") {
      // This is a mock implementation since we don't have region data in the API
      // In a real app, you would filter based on actual region data
      const regionMap: Record<string, string[]> = {
        asia: ["Japan", "Cambodia", "India"],
        europe: ["Italy", "Turkey"],
        africa: ["Morocco", "Egypt"],
        americas: ["Peru"],
        oceania: []
      };
      
      result = result.filter(dest => {
        const region = regionMap[regionFilter];
        return region.some(country => dest.name.includes(country));
      });
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter(dest => 
        dest.tags.map(tag => tag.toLowerCase()).includes(typeFilter.toLowerCase())
      );
    }
    
    setFilteredDestinations(result);
    setCurrentPage(1);
  }, [searchQuery, regionFilter, typeFilter, destinations]);

  // Get current destinations
  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = filteredDestinations.slice(indexOfFirstDestination, indexOfLastDestination);
  const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setRegionFilter("all");
    setTypeFilter("all");
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 dark:bg-navy-light py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">Explore Cultural Destinations</h1>
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-olive dark:border-gold border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 dark:bg-navy-light py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">Explore Cultural Destinations</h1>
          <div className="text-center text-red-500">
            <p>{error}</p>
            <Button 
              className="mt-4 bg-olive dark:bg-gold text-white dark:text-navy"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-navy-light py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">Explore Cultural Destinations</h1>
        
        {/* Search and Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 bg-white dark:bg-navy rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Input
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search destinations, cultures, or experiences..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-ivory dark:bg-navy-light focus:outline-none focus:ring-2 focus:ring-olive dark:focus:ring-gold"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={regionFilter} onValueChange={(value) => setRegionFilter(value as Region)}>
                <SelectTrigger className="border border-gray-300 dark:border-gray-600 rounded-lg bg-ivory dark:bg-navy-light focus:outline-none focus:ring-2 focus:ring-olive dark:focus:ring-gold">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as DestinationType)}>
                <SelectTrigger className="border border-gray-300 dark:border-gray-600 rounded-lg bg-ivory dark:bg-navy-light focus:outline-none focus:ring-2 focus:ring-olive dark:focus:ring-gold">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {destinationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(searchQuery || regionFilter !== "all" || typeFilter !== "all") && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm">
                <span className="font-medium">{filteredDestinations.length}</span>
                <span className="text-gray-500 dark:text-gray-400"> destinations found</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Destinations Grid */}
        {currentDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 mb-4">
              <Filter className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No destinations found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find the cultural experiences you're looking for.
            </p>
            <Button
              onClick={clearFilters}
              className="mt-4 bg-olive dark:bg-gold text-white dark:text-navy"
            >
              Clear All Filters
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredDestinations.length > destinationsPerPage && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow-sm">
              <Button
                variant="outline"
                size="icon"
                className="rounded-l-md border border-gray-300 dark:border-gray-600"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className={`border border-gray-300 dark:border-gray-600 ${
                    currentPage === i + 1 
                      ? "bg-olive dark:bg-gold text-white dark:text-navy" 
                      : "bg-white dark:bg-navy-light text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-r-md border border-gray-300 dark:border-gray-600"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
