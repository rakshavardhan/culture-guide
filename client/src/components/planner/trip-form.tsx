import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { generateItinerary } from "@/utils/itinerary-generator";

const tripFormSchema = z.object({
  destinations: z.array(z.string()).min(1, "Please select at least one destination"),
  duration: z.enum(["short", "medium", "long"], {
    required_error: "Please select a duration",
  }),
  travelStyle: z.enum(["solo", "family", "luxury", "budget"], {
    required_error: "Please select a travel style",
  }),
  budget: z.enum(["economy", "moderate", "luxury"], {
    required_error: "Please select a budget",
  }),
  startDate: z.date().optional(),
});

type TripFormValues = z.infer<typeof tripFormSchema>;

const destinations = [
  { id: "japan", name: "Japan" },
  { id: "italy", name: "Italy" },
  { id: "morocco", name: "Morocco" },
  { id: "peru", name: "Peru" },
  { id: "india", name: "India" },
  { id: "egypt", name: "Egypt" },
  { id: "turkey", name: "Turkey" },
  { id: "greece", name: "Greece" },
];

type TripFormProps = {
  onItineraryGenerated: (itinerary: any) => void;
};

export default function TripForm({ onItineraryGenerated }: TripFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      destinations: [],
      duration: undefined,
      travelStyle: undefined,
      budget: undefined,
    },
  });
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
  
  const selectedDestinations = watch("destinations") || [];
  
  const handleDestinationChange = (destinationId: string) => {
    const updatedDestinations = selectedDestinations.includes(destinationId)
      ? selectedDestinations.filter(id => id !== destinationId)
      : [...selectedDestinations, destinationId];
    
    // Limit to 3 selections
    if (updatedDestinations.length <= 3) {
      setValue("destinations", updatedDestinations);
    } else {
      toast({
        title: "Maximum Selections Reached",
        description: "You can select up to 3 destinations",
        variant: "destructive",
      });
    }
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const onSubmit = async (data: TripFormValues) => {
    try {
      setIsGenerating(true);
      
      // Generate itinerary using mock function
      const itinerary = await generateItinerary(data);
      
      // Save trip data to backend
      const tripData = {
        ...data,
        name: `Trip to ${data.destinations.join(", ")}`,
        itinerary,
      };
      
      await apiRequest("POST", "/api/trips", tripData);
      
      onItineraryGenerated(itinerary);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      toast({
        title: "Error",
        description: "Failed to generate your itinerary. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-navy rounded-xl shadow-lg">
      {/* Progress indicator */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 1 ? "bg-olive dark:bg-gold text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>1</div>
            <span className={`text-sm mt-2 ${
              currentStep >= 1 ? "text-olive dark:text-gold font-medium" : "text-gray-500 dark:text-gray-400"
            }`}>Destination</span>
          </div>
          <div className="flex-grow mx-4 h-1 bg-gray-200 dark:bg-gray-700 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-olive dark:bg-gold" 
              style={{ width: `${(currentStep - 1) * 33.3}%` }}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 2 ? "bg-olive dark:bg-gold text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>2</div>
            <span className={`text-sm mt-2 ${
              currentStep >= 2 ? "text-olive dark:text-gold font-medium" : "text-gray-500 dark:text-gray-400"
            }`}>Duration</span>
          </div>
          <div className="flex-grow mx-4 h-1 bg-gray-200 dark:bg-gray-700 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-olive dark:bg-gold" 
              style={{ width: `${(currentStep - 2) * 50}%` }}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 3 ? "bg-olive dark:bg-gold text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>3</div>
            <span className={`text-sm mt-2 ${
              currentStep >= 3 ? "text-olive dark:text-gold font-medium" : "text-gray-500 dark:text-gray-400"
            }`}>Style</span>
          </div>
          <div className="flex-grow mx-4 h-1 bg-gray-200 dark:bg-gray-700 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-olive dark:bg-gold" 
              style={{ width: `${(currentStep - 3) * 100}%` }}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 4 ? "bg-olive dark:bg-gold text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>4</div>
            <span className={`text-sm mt-2 ${
              currentStep >= 4 ? "text-olive dark:text-gold font-medium" : "text-gray-500 dark:text-gray-400"
            }`}>Budget</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Step 1: Destination selection */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Where would you like to explore?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Select up to 3 destinations that interest you.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {destinations.map((destination) => (
                <label key={destination.id} className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedDestinations.includes(destination.id)}
                    onChange={() => handleDestinationChange(destination.id)}
                  />
                  <div className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedDestinations.includes(destination.id)
                      ? "border-olive dark:border-gold" 
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                  }`}>
                    <div className="flex items-center">
                      <span className={`w-5 h-5 mr-3 border-2 rounded flex-shrink-0 flex items-center justify-center ${
                        selectedDestinations.includes(destination.id)
                          ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                          : "border-gray-300 dark:border-gray-600"
                      }`}>
                        {selectedDestinations.includes(destination.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="font-medium">{destination.name}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            
            {errors.destinations && (
              <p className="text-red-500 mb-4">{errors.destinations.message}</p>
            )}
            
            <div className="text-right">
              <Button 
                type="button"
                onClick={nextStep}
                disabled={selectedDestinations.length === 0}
                className="bg-olive dark:bg-gold text-white dark:text-navy"
              >
                Continue <span className="ml-1">→</span>
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Duration */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">How long is your trip?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Select the duration of your cultural journey.</p>
            
            <div className="space-y-4 mb-8">
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="short"
                  {...register("duration")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("duration") === "short" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("duration") === "short"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Short Trip</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">3-5 days</span>
                    </div>
                  </div>
                </div>
              </label>
              
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="medium"
                  {...register("duration")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("duration") === "medium" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("duration") === "medium"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Medium Trip</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">1-2 weeks</span>
                    </div>
                  </div>
                </div>
              </label>
              
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="long"
                  {...register("duration")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("duration") === "long" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("duration") === "long"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Extended Trip</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">3+ weeks</span>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            
            {errors.duration && (
              <p className="text-red-500 mb-4">{errors.duration.message}</p>
            )}
            
            <div className="flex justify-between">
              <Button 
                type="button"
                variant="outline" 
                onClick={prevStep}
                className="border border-gray-300 dark:border-gray-600"
              >
                <span className="mr-1">←</span> Back
              </Button>
              <Button 
                type="button"
                onClick={nextStep}
                disabled={!watch("duration")}
                className="bg-olive dark:bg-gold text-white dark:text-navy"
              >
                Continue <span className="ml-1">→</span>
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Travel Style */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">What's your travel style?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Select the option that best describes how you like to travel.</p>
            
            <div className="space-y-4 mb-8">
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="solo"
                  {...register("travelStyle")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("travelStyle") === "solo" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("travelStyle") === "solo"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Solo Traveler</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Independent exploration with flexibility</span>
                    </div>
                  </div>
                </div>
              </label>
              
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="family"
                  {...register("travelStyle")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("travelStyle") === "family" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("travelStyle") === "family"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Family Travel</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Kid-friendly activities and accommodations</span>
                    </div>
                  </div>
                </div>
              </label>
              
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="luxury"
                  {...register("travelStyle")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("travelStyle") === "luxury" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("travelStyle") === "luxury"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Luxury Experience</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Premium accommodations and exclusive experiences</span>
                    </div>
                  </div>
                </div>
              </label>
              
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="budget"
                  {...register("travelStyle")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("travelStyle") === "budget" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("travelStyle") === "budget"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Budget Conscious</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Cost-effective options without sacrificing experiences</span>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            
            {errors.travelStyle && (
              <p className="text-red-500 mb-4">{errors.travelStyle.message}</p>
            )}
            
            <div className="flex justify-between">
              <Button 
                type="button"
                variant="outline" 
                onClick={prevStep}
                className="border border-gray-300 dark:border-gray-600"
              >
                <span className="mr-1">←</span> Back
              </Button>
              <Button 
                type="button"
                onClick={nextStep}
                disabled={!watch("travelStyle")}
                className="bg-olive dark:bg-gold text-white dark:text-navy"
              >
                Continue <span className="ml-1">→</span>
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 4: Budget */}
        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">What's your budget level?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Select your preferred budget range for this trip.</p>
            
            <div className="space-y-4 mb-8">
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="economy"
                  {...register("budget")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("budget") === "economy" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("budget") === "economy"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Economy</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">₹8,000-12,000 per day</span>
                    </div>
                  </div>
                </div>
              </label>
              
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="moderate"
                  {...register("budget")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("budget") === "moderate" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("budget") === "moderate"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Moderate</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">₹12,000-24,000 per day</span>
                    </div>
                  </div>
                </div>
              </label>
              
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  className="sr-only peer"
                  value="luxury"
                  {...register("budget")}
                />
                <div className={`p-4 border-2 rounded-lg transition-colors ${
                  watch("budget") === "luxury" 
                    ? "border-olive dark:border-gold" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-light"
                }`}>
                  <div className="flex items-center">
                    <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${
                      watch("budget") === "luxury"
                        ? "bg-olive dark:bg-gold border-olive dark:border-gold"
                        : "border-gray-300 dark:border-gray-600"
                    }`}></span>
                    <div>
                      <span className="font-medium block">Luxury</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">₹24,000+ per day</span>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            
            {errors.budget && (
              <p className="text-red-500 mb-4">{errors.budget.message}</p>
            )}
            
            <div className="flex justify-between">
              <Button 
                type="button"
                variant="outline" 
                onClick={prevStep}
                className="border border-gray-300 dark:border-gray-600"
              >
                <span className="mr-1">←</span> Back
              </Button>
              <Button 
                type="submit"
                disabled={!watch("budget") || isGenerating}
                className="bg-olive dark:bg-gold text-white dark:text-navy"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Itinerary...
                  </>
                ) : (
                  <>Generate Itinerary</>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
