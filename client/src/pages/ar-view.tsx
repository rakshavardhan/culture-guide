import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Info, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import ARScene from "@/components/ar/ar-scene";
import ARInfoOverlay from "@/components/ar/ar-info-overlay";
import { delay } from "@/lib/utils";

export default function ARView() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [currentSite, setCurrentSite] = useState<{
    id: string;
    name: string;
    description: string;
    culturalInfo: string;
    historicalDetails: string;
    year: string;
  } | null>(null);

  // In a real app, we would get the site ID from URL params and fetch data from API
  useEffect(() => {
    const loadSiteData = async () => {
      setIsLoading(true);
      
      // Simulate API call to get site data
      await delay(1000);
      
      // Mock site data - in a real app, this would come from an API
      setCurrentSite({
        id: "taj-mahal",
        name: "Taj Mahal",
        description: "One of the seven wonders of the world, a symbol of eternal love.",
        culturalInfo: "The Taj Mahal represents the finest and most sophisticated example of Mughal architecture. Its distinctive features include its perfect proportions, distinct silhouette, stunning gardens, and intricate marble inlay work.",
        historicalDetails: "Built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, who died giving birth to their 14th child in 1631. The construction began in 1632 and was completed in 1643.",
        year: "1643"
      });
      
      setIsLoading(false);
    };
    
    loadSiteData();
  }, []);

  const handleBack = () => {
    navigate("/nearby");
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-olive/20 dark:bg-gold/20 mb-4">
            <div className="w-8 h-8 border-4 border-olive dark:border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Loading AR Experience</h3>
          <p className="text-gray-400">
            Preparing your augmented reality view...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* AR Scene Component */}
      <ARScene siteId={currentSite?.id || ""} />
      
      {/* Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <Button 
          variant="outline" 
          size="icon"
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            className="bg-black/50 text-white border-white/20 hover:bg-black/70"
            onClick={toggleInfo}
          >
            <Info className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          >
            <Camera className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Site name at bottom */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <div className="inline-block bg-black/70 text-white px-6 py-2 rounded-full font-bold text-lg">
          {currentSite?.name || "Cultural Site"}
        </div>
      </div>
      
      {/* Information Overlay */}
      {showInfo && currentSite && (
        <ARInfoOverlay site={currentSite} onClose={toggleInfo} />
      )}
    </div>
  );
}