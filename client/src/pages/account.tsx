import { useState } from "react";
import { format } from "date-fns";
import { User, MapPin, Calendar, CreditCard, Clock, Settings, Bell, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

// Mock user data
const userData = {
  name: "Arjun Patel",
  email: "arjun.patel@example.com",
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  joinDate: new Date(2022, 5, 15),
  language: "en",
  trips: [
    {
      id: 1,
      destination: "Kyoto, Japan",
      startDate: new Date(2023, 3, 10),
      endDate: new Date(2023, 3, 17),
      image: "https://images.unsplash.com/photo-1599620919128-a95eeb2d38de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "completed"
    },
    {
      id: 2,
      destination: "Marrakech, Morocco",
      startDate: new Date(2023, 8, 5),
      endDate: new Date(2023, 8, 12),
      image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "upcoming"
    }
  ],
  bookings: [
    {
      id: 101,
      destination: "Venice, Italy",
      startDate: new Date(2023, 11, 20),
      endDate: new Date(2023, 11, 27),
      amount: 1250,
      status: "confirmed"
    }
  ],
  savedPlaces: [
    {
      id: 201,
      name: "Angkor Wat",
      location: "Cambodia",
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 202,
      name: "Petra",
      location: "Jordan",
      image: "https://images.unsplash.com/photo-1519922639192-e73293ca430e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 203,
      name: "Machu Picchu",
      location: "Peru",
      image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ]
};

export default function Account() {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "confirmed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-navy-light min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* User Header */}
          <div className="bg-white dark:bg-navy rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {userData.profileImage ? (
                  <img src={userData.profileImage} alt={userData.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="md:flex-grow text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-playfair font-bold">{userData.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{userData.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Member since {format(userData.joinDate, "MMMM yyyy")}
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <Tabs defaultValue="trips" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="trips">My Trips</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="saved">Saved Places</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Trips Tab */}
            <TabsContent value="trips">
              <div className="bg-white dark:bg-navy rounded-xl shadow-md p-6">
                <h2 className="text-xl font-playfair font-bold mb-6">My Cultural Journeys</h2>
                
                {userData.trips.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userData.trips.map((trip) => (
                      <div key={trip.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col">
                        <div className="h-48 overflow-hidden">
                          <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{trip.destination}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(trip.status)}`}>
                              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            {format(trip.startDate, "MMM d")} - {format(trip.endDate, "MMM d, yyyy")}
                          </div>
                          <div className="flex justify-between mt-2">
                            <Button variant="outline" size="sm">
                              View Itinerary
                            </Button>
                            {trip.status === "completed" && (
                              <Button variant="outline" size="sm">
                                Add Review
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No trips yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Start planning your first cultural journey now.
                    </p>
                    <Button className="bg-olive dark:bg-gold text-white dark:text-navy">
                      Plan a Trip
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <div className="bg-white dark:bg-navy rounded-xl shadow-md p-6">
                <h2 className="text-xl font-playfair font-bold mb-6">My Bookings</h2>
                
                {userData.bookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                          <th className="pb-3 font-medium">Destination</th>
                          <th className="pb-3 font-medium">Dates</th>
                          <th className="pb-3 font-medium">Amount</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.bookings.map((booking) => (
                          <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-4">{booking.destination}</td>
                            <td className="py-4 text-gray-500 dark:text-gray-400">
                              {format(booking.startDate, "MMM d")} - {format(booking.endDate, "MMM d, yyyy")}
                            </td>
                            <td className="py-4">${booking.amount}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Book your first cultural experience to see it here.
                    </p>
                    <Button className="bg-olive dark:bg-gold text-white dark:text-navy">
                      Explore Experiences
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Saved Places Tab */}
            <TabsContent value="saved">
              <div className="bg-white dark:bg-navy rounded-xl shadow-md p-6">
                <h2 className="text-xl font-playfair font-bold mb-6">Saved Places</h2>
                
                {userData.savedPlaces.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData.savedPlaces.map((place) => (
                      <div key={place.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                          <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4 w-full">
                              <Button variant="default" size="sm" className="w-full bg-white/90 text-gray-900 hover:bg-white">
                                Explore
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold">{place.name}</h3>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {place.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No saved places</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Save destinations to your wishlist for quick access.
                    </p>
                    <Button className="bg-olive dark:bg-gold text-white dark:text-navy">
                      Explore Destinations
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="bg-white dark:bg-navy rounded-xl shadow-md p-6">
                <h2 className="text-xl font-playfair font-bold mb-6">Account Settings</h2>
                
                <div className="space-y-8">
                  {/* Profile Section */}
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-4">
                      <User className="h-5 w-5 mr-2" />
                      Profile Information
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="preferredLanguage">Preferred Language</Label>
                        <Select defaultValue={userData.language}>
                          <SelectTrigger id="preferredLanguage" className="mt-1">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="ja">日本語</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="bg-olive dark:bg-gold text-white dark:text-navy">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Notifications Section */}
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-4">
                      <Bell className="h-5 w-5 mr-2" />
                      Notification Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailNotifications" className="text-base font-medium">Email Notifications</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive trip suggestions, booking confirmations, and travel tips
                          </p>
                        </div>
                        <Switch id="emailNotifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="specialOffers" className="text-base font-medium">Special Offers</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Get promotions, discounts, and special deals
                          </p>
                        </div>
                        <Switch id="specialOffers" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Account Actions */}
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-4">
                      <Settings className="h-5 w-5 mr-2" />
                      Account Actions
                    </h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
