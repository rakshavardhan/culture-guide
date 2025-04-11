import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Info, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import ARScene from "@/components/ar/ar-scene";
import ARInfoOverlay from "@/components/ar/ar-info-overlay";
import { delay } from "@/lib/utils";
import attractions from "@/data/attractions";

export default function ARView() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [, params] = useRoute('/ar/:siteId');
  const [currentSite, setCurrentSite] = useState<{
    id: string;
    name: string;
    description: string;
    culturalInfo: string;
    historicalDetails: string;
    year: string;
  } | null>(null);

  // Get site ID from URL params and load corresponding data
  useEffect(() => {
    const loadSiteData = async () => {
      setIsLoading(true);
      
      // Get the site ID from the URL parameter or default to "taj-mahal"
      const siteId = params?.siteId || "taj-mahal";
      
      // Simulate API call to get site data
      await delay(800);
      
      // Special handling for predefined AR sites
      if (siteId === "taj-mahal" || siteId === "machu-picchu" || siteId === "angkor-wat") {
        // These are from the AR sites list
        const siteName = siteId === "taj-mahal" ? "Taj Mahal" : 
                         siteId === "machu-picchu" ? "Machu Picchu" : "Angkor Wat";
        
        const siteYear = siteId === "taj-mahal" ? "1643" : 
                         siteId === "machu-picchu" ? "1450" : "1150";
        
        setCurrentSite({
          id: siteId,
          name: siteName,
          description: `A famous ${siteId === "taj-mahal" ? "mausoleum" : "historical site"} and UNESCO World Heritage Site.`,
          culturalInfo: `This site represents the pinnacle of ${siteId === "taj-mahal" ? "Mughal" : siteId === "machu-picchu" ? "Incan" : "Khmer"} architecture and cultural achievement.`,
          historicalDetails: `This historical site dates back to the ${siteId === "taj-mahal" ? "17th" : siteId === "machu-picchu" ? "15th" : "12th"} century and has great significance to the local culture and history.`,
          year: siteYear
        });
      } else {
        // Look for the attraction in our data
        const attraction = attractions.find(a => a.id === siteId);
        
        if (attraction) {
          // Create site info from attraction data
          setCurrentSite({
            id: attraction.id,
            name: attraction.name,
            description: attraction.description,
            culturalInfo: `${attraction.name} is a significant cultural site in the category of ${attraction.category}.`,
            historicalDetails: `Located at ${attraction.address}, this site offers visitors insight into local history and traditions.`,
            year: attraction.category === "Heritage" ? "~1200" : "~1800"
          });
        } else {
          // Fallback data if we can't find a match
          setCurrentSite({
            id: siteId,
            name: "Cultural Heritage Site",
            description: "An important historical and cultural landmark.",
            culturalInfo: "This site has cultural significance to the local community and represents important historical events and traditions.",
            historicalDetails: "The exact origins of this site are not well documented, but it has been an important part of local culture for generations.",
            year: "Unknown"
          });
        }
      }
      
      setIsLoading(false);
    };
    
    loadSiteData();
  }, [params]);

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
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none space-y-2">
        <div className="inline-block bg-black/70 text-white px-6 py-2 rounded-full font-bold text-lg">
          {currentSite?.name || "Cultural Site"}
        </div>
        
        {/* Interaction hint */}
        <div className="block text-white text-sm animate-pulse">
          Tap the screen to pause/resume animation
        </div>
      </div>
      
      {/* Information Overlay */}
      {showInfo && currentSite && (
        <ARInfoOverlay site={currentSite} onClose={toggleInfo} />
      )}
    </div>
  );
}