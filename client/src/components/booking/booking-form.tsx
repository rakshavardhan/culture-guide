import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar as CalendarIcon, User, CreditCard, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

// Booking form schema with all required fields
const bookingFormSchema = z.object({
  destination: z.string().min(1, "Please select a destination"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }).refine(
    (date, ctx) => {
      const startDate = ctx.parent.startDate as Date;
      return date > startDate;
    },
    {
      message: "End date must be after start date",
    }
  ),
  groupSize: z.coerce.number().min(1, "Group size must be at least 1").max(20, "Group size cannot exceed 20"),
  addOns: z.array(z.string()).default([]),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(6, "Phone number is required"),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const destinations = [
  { id: "japan", name: "Kyoto, Japan" },
  { id: "italy", name: "Venice, Italy" },
  { id: "morocco", name: "Marrakech, Morocco" },
  { id: "peru", name: "Machu Picchu, Peru" },
  { id: "india", name: "Varanasi, India" },
  { id: "turkey", name: "Istanbul, Turkey" },
  { id: "egypt", name: "Cairo, Egypt" },
  { id: "thailand", name: "Bangkok, Thailand" },
];

const addOns = [
  { id: "guide", label: "Local guide", description: "Expert local guide for cultural insights", price: 50 },
  { id: "cultural-show", label: "Cultural show", description: "Traditional entertainment experience", price: 35 },
  { id: "premium-accommodation", label: "Premium accommodation", description: "Upgrade to luxury accommodations", price: 120 },
  { id: "airport-transfer", label: "Airport transfer", description: "Private transportation to/from airport", price: 45 },
  { id: "food-tour", label: "Food tour", description: "Guided tour of local cuisine and delicacies", price: 60 },
];

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingFormValues | null>(null);
  const { toast } = useToast();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      destination: "",
      groupSize: 2,
      addOns: [],
      fullName: "",
      email: "",
      phoneNumber: "",
      specialRequests: "",
    },
  });

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate just the first page fields
      form.trigger(["destination", "startDate", "endDate", "groupSize"]);
      
      if (
        !form.formState.errors.destination &&
        !form.formState.errors.startDate &&
        !form.formState.errors.endDate &&
        !form.formState.errors.groupSize
      ) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const calculateTotal = (formData: BookingFormValues) => {
    // Base price per person per day
    const basePrice = 100;
    
    // Calculate number of days
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const days = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    // Calculate base total
    let total = basePrice * days * formData.groupSize;
    
    // Add cost of add-ons
    formData.addOns.forEach(addonId => {
      const addon = addOns.find(a => a.id === addonId);
      if (addon) {
        total += addon.price;
      }
    });
    
    return total;
  };

  const onSubmit = async (data: BookingFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Calculate total cost
      const totalCost = calculateTotal(data);
      
      // Format data for API
      const bookingData = {
        ...data,
        totalCost,
        status: "pending",
      };
      
      // Submit booking to API
      await apiRequest("POST", "/api/bookings", bookingData);
      
      setBookingDetails(data);
      setBookingComplete(true);
      setIsSubmitting(false);
      
      toast({
        title: "Booking Successful!",
        description: "Your cultural journey has been booked.",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      setIsSubmitting(false);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  // If booking is complete, show confirmation
  if (bookingComplete && bookingDetails) {
    const total = calculateTotal(bookingDetails);
    const days = Math.round(
      (new Date(bookingDetails.endDate).getTime() - new Date(bookingDetails.startDate).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-navy rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        
        <h2 className="text-2xl font-playfair font-bold mb-4">Thank You for Your Booking!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your {days}-day journey to {destinations.find(d => d.id === bookingDetails.destination)?.name} has been confirmed.
        </p>
        
        <div className="mb-8 bg-gray-50 dark:bg-navy-light p-6 rounded-lg text-left">
          <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Destination</p>
              <p className="font-medium">{destinations.find(d => d.id === bookingDetails.destination)?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dates</p>
              <p className="font-medium">
                {format(new Date(bookingDetails.startDate), "PPP")} - {format(new Date(bookingDetails.endDate), "PPP")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Group Size</p>
              <p className="font-medium">{bookingDetails.groupSize} {bookingDetails.groupSize === 1 ? 'person' : 'people'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
              <p className="font-medium">{bookingDetails.email}</p>
            </div>
          </div>
          
          {bookingDetails.addOns.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Add-ons</p>
              <ul className="list-disc pl-5">
                {bookingDetails.addOns.map(addonId => {
                  const addon = addOns.find(a => a.id === addonId);
                  return addon ? (
                    <li key={addon.id} className="text-sm">
                      {addon.label} (₹{addon.price * 80})
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total Cost</span>
              <span>₹{total * 80}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          A confirmation email has been sent to {bookingDetails.email}. <br />
          We'll be in touch with more details soon!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline" 
            className="border-olive dark:border-gold text-olive dark:text-gold"
            onClick={() => window.print()}
          >
            Print Confirmation
          </Button>
          <Button 
            className="bg-olive dark:bg-gold text-white dark:text-navy"
            onClick={() => {
              setBookingComplete(false);
              setCurrentStep(1);
              form.reset();
            }}
          >
            Book Another Trip
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-navy rounded-xl shadow-lg">
      {/* Progress steps */}
      <div className="relative pt-6">
        <div className="flex justify-between items-center mx-10 mb-8">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 1 ? "bg-olive dark:bg-gold text-white dark:text-navy" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>1</div>
            <span className="text-sm mt-2">Trip Details</span>
          </div>
          
          <div className="flex-grow mx-4 h-1 bg-gray-200 dark:bg-gray-700 relative">
            <div className="absolute top-0 left-0 h-full bg-olive dark:bg-gold" style={{ width: currentStep > 1 ? "100%" : "0%" }}></div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 2 ? "bg-olive dark:bg-gold text-white dark:text-navy" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>2</div>
            <span className="text-sm mt-2">Add-ons</span>
          </div>
          
          <div className="flex-grow mx-4 h-1 bg-gray-200 dark:bg-gray-700 relative">
            <div className="absolute top-0 left-0 h-full bg-olive dark:bg-gold" style={{ width: currentStep > 2 ? "100%" : "0%" }}></div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 3 ? "bg-olive dark:bg-gold text-white dark:text-navy" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>3</div>
            <span className="text-sm mt-2">Payment</span>
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
          {/* Step 1: Trip Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-playfair font-bold mb-6">Choose Your Destination & Dates</h2>
              
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {destinations.map((destination) => (
                          <SelectItem key={destination.id} value={destination.id}>
                            {destination.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const startDate = form.getValues().startDate;
                              return startDate ? date <= startDate : date < new Date(new Date().setHours(0, 0, 0, 0));
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="groupSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Size</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min={1}
                          max={20}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-olive dark:bg-gold text-white dark:text-navy"
                >
                  Continue to Add-ons
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 2: Add-ons */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-playfair font-bold mb-6">Enhance Your Experience</h2>
              
              <FormField
                control={form.control}
                name="addOns"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Select optional add-ons for your journey</FormLabel>
                    </div>
                    {addOns.map((addon) => (
                      <FormField
                        key={addon.id}
                        control={form.control}
                        name="addOns"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={addon.id}
                              className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md mb-3"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(addon.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, addon.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== addon.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <FormLabel className="font-medium cursor-pointer">
                                    {addon.label}
                                  </FormLabel>
                                  <span className="font-medium text-olive dark:text-gold">${addon.price}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {addon.description}
                                </p>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-olive dark:bg-gold text-white dark:text-navy"
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Contact & Payment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-playfair font-bold mb-6">Contact & Payment Information</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Simulated payment form */}
                <div className="border rounded-md p-4 space-y-4">
                  <h3 className="font-medium flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Input placeholder="Card Number" className="border-gray-300 dark:border-gray-600" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" className="border-gray-300 dark:border-gray-600" />
                      <Input placeholder="CVC" className="border-gray-300 dark:border-gray-600" />
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>This is a demonstration. No actual payment will be processed.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-navy-light p-4 rounded-md">
                  <h3 className="font-medium mb-3">Trip Summary</h3>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Destination:</span>
                      <span>
                        {form.watch("destination") ? 
                          destinations.find(d => d.id === form.watch("destination"))?.name : 
                          "Not selected"
                        }
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Dates:</span>
                      <span>
                        {form.watch("startDate") && form.watch("endDate") ? 
                          `${format(form.watch("startDate"), "MMM d")} - ${format(form.watch("endDate"), "MMM d, yyyy")}` : 
                          "Not selected"
                        }
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Group Size:</span>
                      <span>{form.watch("groupSize")} people</span>
                    </div>
                    
                    {form.watch("addOns").length > 0 && (
                      <div>
                        <span className="block mb-1">Add-ons:</span>
                        <ul className="pl-4 space-y-1">
                          {form.watch("addOns").map(addonId => {
                            const addon = addOns.find(a => a.id === addonId);
                            return addon ? (
                              <li key={addon.id} className="flex justify-between">
                                <span>{addon.label}</span>
                                <span>₹{addon.price * 80}</span>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span>Estimated Total:</span>
                      <span>${calculateTotal(form.getValues())}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-terracotta dark:bg-gold text-white dark:text-navy"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Complete Booking"
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
