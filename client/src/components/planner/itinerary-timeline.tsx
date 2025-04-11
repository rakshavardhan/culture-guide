import { useState } from "react";
import { LightbulbIcon, UtensilsIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type Day = {
  id: string;
  title: string;
  description: string;
  insight?: {
    type: "cultural" | "food";
    text: string;
  };
};

type ItineraryProps = {
  destination: string;
  duration: string;
  days: Day[];
  onModify: () => void;
};

export default function ItineraryTimeline({ destination, duration, days, onModify }: ItineraryProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  const addons = [
    { id: "cooking", name: "Traditional cooking class", price: 75 },
    { id: "tea", name: "Private tea ceremony", price: 50 },
    { id: "guide", name: "Local guide for heritage sites", price: 120 },
  ];
  
  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const durationText = 
    duration === "short" ? "a short trip" :
    duration === "medium" ? "a week-long journey" :
    "an extended expedition";
  
  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-xl font-playfair font-bold mb-2">Your Cultural Journey to {destination}</h3>
        <p className="text-gray-600 dark:text-gray-300">{durationText} through cultural heritage sites</p>
      </div>
      
      {/* Itinerary Timeline */}
      <div className="space-y-6 mb-8">
        {days.map((day, index) => (
          <div key={day.id} className="relative pl-8 pb-8 border-l-2 border-olive dark:border-gold">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-olive dark:bg-gold"></div>
            <h4 className="font-bold text-lg mb-2">{day.title}</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">{day.description}</p>
            {day.insight && (
              <div className="bg-gray-100 dark:bg-navy-light p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">
                  {day.insight.type === "cultural" ? (
                    <><LightbulbIcon className="inline h-4 w-4 text-gold mr-1" /> Cultural Insight:</>
                  ) : (
                    <><UtensilsIcon className="inline h-4 w-4 text-gold mr-1" /> Food Recommendation:</>
                  )}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{day.insight.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Customize options */}
      <div className="bg-gray-100 dark:bg-navy-light p-4 rounded-lg mb-6">
        <h4 className="font-medium mb-3">Enhance your experience with:</h4>
        <div className="space-y-2">
          {addons.map(addon => (
            <div key={addon.id} className="flex items-center space-x-2">
              <Checkbox 
                id={addon.id} 
                checked={selectedAddons.includes(addon.id)}
                onCheckedChange={() => toggleAddon(addon.id)}
              />
              <Label htmlFor={addon.id} className="text-sm">
                {addon.name} (+${addon.price})
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onModify}
          className="border border-gray-300 dark:border-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Modify
        </Button>
        <Button className="bg-terracotta dark:bg-gold text-white dark:text-navy">
          Save Itinerary
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
