import { useState } from "react";
import TripForm from "@/components/planner/trip-form";
import ItineraryTimeline from "@/components/planner/itinerary-timeline";

export default function Planner() {
  const [itinerary, setItinerary] = useState<any>(null);
  const [showForm, setShowForm] = useState(true);

  const handleItineraryGenerated = (generatedItinerary: any) => {
    setItinerary(generatedItinerary);
    setShowForm(false);
  };

  const handleModify = () => {
    setShowForm(true);
  };

  return (
    <div className="bg-gray-100 dark:bg-navy-light py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-8">Plan Your Cultural Journey</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Tell us your preferences, and our AI will craft a personalized cultural itinerary just for you.
        </p>
        
        {showForm ? (
          <TripForm onItineraryGenerated={handleItineraryGenerated} />
        ) : (
          <div className="max-w-3xl mx-auto bg-white dark:bg-navy rounded-xl shadow-lg p-6">
            <ItineraryTimeline
              destination={itinerary.destination}
              duration={itinerary.duration}
              days={itinerary.days}
              onModify={handleModify}
            />
          </div>
        )}
      </div>
    </div>
  );
}
