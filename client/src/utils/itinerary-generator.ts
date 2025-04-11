import { delay } from "@/lib/utils";

type TripFormData = {
  destinations: string[];
  duration: string;
  travelStyle: string;
  budget: string;
  startDate?: Date;
};

type Day = {
  id: string;
  title: string;
  description: string;
  insight?: {
    type: "cultural" | "food";
    text: string;
  };
};

type Itinerary = {
  destination: string;
  duration: string;
  days: Day[];
};

/**
 * Generate a travel itinerary based on user preferences
 * 
 * In a production environment, this would connect to an AI service or recommendation engine
 * This is a placeholder that returns mock itineraries based on the selected destination
 */
export async function generateItinerary(tripData: TripFormData): Promise<Itinerary> {
  // Simulate API call delay
  await delay(2500);
  
  // Get the first destination from the list (in reality, it would handle multiple destinations)
  const destination = tripData.destinations[0];
  
  // Determine number of days based on duration
  const daysCount = tripData.duration === "short" ? 3 : 
                   tripData.duration === "medium" ? 7 : 14;
  
  // Call the appropriate itinerary generator based on destination
  switch (destination) {
    case "japan":
      return generateJapanItinerary(daysCount, tripData.travelStyle, tripData.budget);
    case "italy":
      return generateItalyItinerary(daysCount, tripData.travelStyle, tripData.budget);
    case "morocco":
      return generateMoroccoItinerary(daysCount, tripData.travelStyle, tripData.budget);
    case "peru":
      return generatePeruItinerary(daysCount, tripData.travelStyle, tripData.budget);
    case "india":
      return generateIndiaItinerary(daysCount, tripData.travelStyle, tripData.budget);
    case "egypt":
      return generateEgyptItinerary(daysCount, tripData.travelStyle, tripData.budget);
    case "turkey":
      return generateTurkeyItinerary(daysCount, tripData.travelStyle, tripData.budget);
    case "greece":
      return generateGreeceItinerary(daysCount, tripData.travelStyle, tripData.budget);
    default:
      // Generic itinerary if no specific destination matched
      return generateGenericItinerary(destination, daysCount, tripData.travelStyle, tripData.budget);
  }
}

// Helper function to generate an itinerary for Japan
function generateJapanItinerary(days: number, travelStyle: string, budget: string): Itinerary {
  const itinerary: Itinerary = {
    destination: "Japan",
    duration: days <= 5 ? "short" : days <= 10 ? "medium" : "long",
    days: []
  };
  
  // Day 1: Tokyo
  itinerary.days.push({
    id: "day1",
    title: "Day 1: Tokyo Exploration",
    description: "Begin your journey in Tokyo with a visit to the ancient Sensō-ji Temple in Asakusa, followed by the serene gardens of the Imperial Palace.",
    insight: {
      type: "cultural",
      text: "Learn about Shinto purification rituals before entering Japanese temples."
    }
  });
  
  // Day 2: Traditional Arts
  itinerary.days.push({
    id: "day2",
    title: "Day 2: Traditional Arts",
    description: "Participate in a traditional tea ceremony workshop and visit the Sumida Hokusai Museum to learn about ukiyo-e woodblock printing.",
    insight: {
      type: "food",
      text: "Try kaiseki, a traditional multi-course Japanese dinner that emphasizes seasonality."
    }
  });
  
  // Day 3: Kyoto
  itinerary.days.push({
    id: "day3",
    title: "Day 3: Kyoto's Temples",
    description: "Travel to Kyoto and visit Kinkaku-ji (Golden Pavilion) and Fushimi Inari Shrine with its iconic torii gates."
  });
  
  // Add more days if the trip is longer
  if (days > 3) {
    itinerary.days.push({
      id: "day4",
      title: "Day 4: Arashiyama Bamboo Grove",
      description: "Explore the enchanting Arashiyama Bamboo Grove and visit Tenryu-ji Temple, a UNESCO World Heritage site.",
      insight: {
        type: "cultural",
        text: "The bamboo in Japanese culture symbolizes strength, flexibility and prosperity."
      }
    });
    
    itinerary.days.push({
      id: "day5",
      title: "Day 5: Nara Day Trip",
      description: "Take a day trip to Nara to see Todai-ji Temple housing the Great Buddha and feed the sacred deer that roam the park.",
    });
  }
  
  // Add luxury experiences for luxury travel style
  if (travelStyle === "luxury" && budget === "luxury") {
    itinerary.days.push({
      id: "luxury1",
      title: `Day ${itinerary.days.length + 1}: Private Geisha Experience`,
      description: "Enjoy an exclusive private dinner with authentic Geisha entertainment in a traditional Kyoto teahouse.",
      insight: {
        type: "cultural",
        text: "Geisha are highly skilled artists trained in traditional Japanese arts, music and dance, not companions as commonly misunderstood."
      }
    });
  }
  
  return itinerary;
}

// Helper function to generate an itinerary for Italy
function generateItalyItinerary(days: number, travelStyle: string, budget: string): Itinerary {
  const itinerary: Itinerary = {
    destination: "Italy",
    duration: days <= 5 ? "short" : days <= 10 ? "medium" : "long",
    days: []
  };
  
  // Day 1: Rome
  itinerary.days.push({
    id: "day1",
    title: "Day 1: Ancient Rome",
    description: "Begin your Italian journey in Rome with visits to the Colosseum, Roman Forum and Palatine Hill to explore the heart of the ancient empire.",
    insight: {
      type: "cultural",
      text: "The Colosseum could hold up to 80,000 spectators and was used for gladiatorial contests and public spectacles."
    }
  });
  
  // Day 2: Vatican City
  itinerary.days.push({
    id: "day2",
    title: "Day 2: Vatican Treasures",
    description: "Explore Vatican City, visiting St. Peter's Basilica, the Sistine Chapel with Michelangelo's ceiling, and the Vatican Museums.",
    insight: {
      type: "cultural",
      text: "Michelangelo spent four years painting the Sistine Chapel ceiling, creating one of history's most remarkable artistic achievements."
    }
  });
  
  // Day 3: Venice
  itinerary.days.push({
    id: "day3",
    title: "Day 3: Venice Canals",
    description: "Travel to Venice and experience a gondola ride through the Grand Canal. Visit St. Mark's Square and Basilica.",
    insight: {
      type: "food",
      text: "Try cicchetti, Venice's version of tapas, small plates of seafood, meats and vegetables served in local bacari (wine bars)."
    }
  });
  
  // Add more days for longer trips
  if (days > 3) {
    itinerary.days.push({
      id: "day4",
      title: "Day 4: Florence Renaissance",
      description: "Explore Florence, the birthplace of the Renaissance. Visit the Uffizi Gallery, Duomo, and Michelangelo's David at the Accademia.",
    });
    
    itinerary.days.push({
      id: "day5",
      title: "Day 5: Tuscan Countryside",
      description: "Take a day trip to the Tuscan countryside to visit medieval hill towns like San Gimignano and enjoy a wine tasting in Chianti.",
      insight: {
        type: "food",
        text: "Chianti wine must be produced in the Chianti region and made from at least 80% Sangiovese grapes to be labeled as authentic Chianti."
      }
    });
  }
  
  return itinerary;
}

// Helper function to generate an itinerary for Morocco
function generateMoroccoItinerary(days: number, travelStyle: string, budget: string): Itinerary {
  const itinerary: Itinerary = {
    destination: "Morocco",
    duration: days <= 5 ? "short" : days <= 10 ? "medium" : "long",
    days: []
  };
  
  // Day 1: Marrakech
  itinerary.days.push({
    id: "day1",
    title: "Day 1: Marrakech Medina",
    description: "Explore the bustling Medina of Marrakech, visit the iconic Jemaa el-Fnaa square, and get lost in the colorful souks.",
    insight: {
      type: "cultural",
      text: "Haggling is not just expected in Moroccan souks, it's an integral part of the shopping experience and cultural tradition."
    }
  });
  
  // Day 2: Marrakech Gardens
  itinerary.days.push({
    id: "day2",
    title: "Day 2: Gardens and Palaces",
    description: "Visit the stunning Majorelle Garden, the Bahia Palace, and the Saadian Tombs to experience the architectural wonders of Morocco.",
    insight: {
      type: "cultural",
      text: "Majorelle Garden was owned by Yves Saint Laurent, who saved it from becoming a hotel and had his ashes scattered there when he died."
    }
  });
  
  // Day 3: Atlas Mountains
  itinerary.days.push({
    id: "day3",
    title: "Day 3: Atlas Mountains",
    description: "Take a day trip to the Atlas Mountains to visit Berber villages and experience the stunning mountain landscapes.",
    insight: {
      type: "food",
      text: "Try a traditional Berber tagine cooked slowly over hot coals, often featuring preserved lemons and olives with chicken or lamb."
    }
  });
  
  // Add more days for longer trips
  if (days > 3) {
    itinerary.days.push({
      id: "day4",
      title: "Day 4: Essaouira Coast",
      description: "Travel to the coastal town of Essaouira to explore its historic medina, port, and beautiful beaches.",
    });
    
    itinerary.days.push({
      id: "day5",
      title: "Day 5: Fes Ancient Medina",
      description: "Journey to Fes and explore the ancient medina, visiting the oldest university in the world, Al-Qarawiyyin, and the famous tanneries.",
      insight: {
        type: "cultural",
        text: "The leather tanneries in Fes have operated using the same traditional methods since medieval times, with natural dyes from plants and minerals."
      }
    });
  }
  
  return itinerary;
}

// Helper function to generate an itinerary for Peru
function generatePeruItinerary(days: number, travelStyle: string, budget: string): Itinerary {
  const itinerary: Itinerary = {
    destination: "Peru",
    duration: days <= 5 ? "short" : days <= 10 ? "medium" : "long",
    days: []
  };
  
  // Day 1: Lima
  itinerary.days.push({
    id: "day1",
    title: "Day 1: Lima's Colonial Heritage",
    description: "Explore Lima's historic center with its colonial architecture, visit the Larco Museum, and enjoy coastal views at Miraflores.",
    insight: {
      type: "food",
      text: "Peru is the birthplace of ceviche - try the traditional lime-marinated seafood dish with a side of sweet potato and corn."
    }
  });
  
  // Day 2-3: Cusco
  itinerary.days.push({
    id: "day2",
    title: "Day 2: Cusco Acclimation",
    description: "Fly to Cusco and spend the day acclimating to the altitude while exploring the historic Plaza de Armas and visiting the Qorikancha (Temple of the Sun).",
    insight: {
      type: "cultural",
      text: "Coca leaf tea is traditionally used to help combat altitude sickness in the Andes and has been an important part of Andean culture for centuries."
    }
  });
  
  // Machu Picchu
  itinerary.days.push({
    id: "day3",
    title: "Day 3: Machu Picchu",
    description: "Take the train to Aguas Calientes and visit the breathtaking Incan citadel of Machu Picchu with a guided tour.",
    insight: {
      type: "cultural",
      text: "Machu Picchu was built in the 15th century and abandoned just 100 years later, remaining unknown to the outside world until 1911."
    }
  });
  
  // Add more days for longer trips
  if (days > 3) {
    itinerary.days.push({
      id: "day4",
      title: "Day 4: Sacred Valley",
      description: "Explore the Sacred Valley of the Incas, visiting the ruins and market at Pisac and the fortress at Ollantaytambo.",
    });
    
    itinerary.days.push({
      id: "day5",
      title: "Day 5: Rainbow Mountain",
      description: "Take a day trip to Vinicunca (Rainbow Mountain) to see the stunning naturally colored mountains, a challenging but rewarding hike.",
      insight: {
        type: "cultural",
        text: "The vibrant colors of Rainbow Mountain were only recently discovered as the snow covering them melted due to climate change."
      }
    });
  }
  
  return itinerary;
}

function generateIndiaItinerary(days: number, travelStyle: string, budget: string): Itinerary {
  // Implementation similar to above
  return {
    destination: "India",
    duration: days <= 5 ? "short" : days <= 10 ? "medium" : "long",
    days: [
      {
        id: "day1",
        title: "Day 1: Delhi's Contrasts",
        description: "Explore Old Delhi's narrow lanes, visit Jama Masjid, and contrast with New Delhi's colonial architecture and wide boulevards.",
        insight: {
          type: "cultural",
          text: "Delhi has been continuously inhabited since the 6th century BCE and has been the capital of various empires throughout history."
        }
      },
      {
        id: "day2",
        title: "Day 2: Agra and the Taj Mahal",
        description: "Travel to Agra to witness the breathtaking Taj Mahal at sunrise, then visit Agra Fort and explore the markets.",
        insight: {
          type: "cultural",
          text: "The Taj Mahal took over 20,000 workers and 1,000 elephants to build over a period of 22 years, completed in 1643."
        }
      },
      {
        id: "day3",
        title: "Day 3: Jaipur Pink City",
        description: "Discover the 'Pink City' of Jaipur, visiting Amber Fort, City Palace, and the astronomical instruments at Jantar Mantar.",
        insight: {
          type: "food",
          text: "Try Rajasthani thali, a complete meal with various dishes served on a platter, showcasing the rich culinary traditions of the region."
        }
      }
    ]
  };
}

function generateEgyptItinerary(days: number, travelStyle: string, budget: string): Itinerary {
  // Implementation similar to above
  return {
    destination: "Egypt",
    duration: days <= 5 ? "short" : days <= 10 ? "medium" : "long",
    days: [
      {
        id: "day1",
        title: "Day 1: Cairo and the Pyramids",
        description: "Begin your Egyptian journey with a visit to the Giza Pyramids and the enigmatic Sphinx, followed by the Egyptian Museum.",
        insight: {
          type: "cultural",
          text: "The Great Pyramid of Giza was the tallest man-made structure in the world for over 3,800 years until the completion of Lincoln Cathedral in 1311."
        }
      },
      {
        id: "day2",
        title: "Day 2: Islamic Cairo",
        description: "Explore the historic mosques, markets, and medieval gates of Islamic Cairo, including the stunning Citadel of Saladin.",
        insight: {
          type: "food",
          text: "Koshari, Egypt's national dish, is a vegetarian street food made of rice, lentils, and macaroni topped with tomato sauce and fried onions."
        }
      },
      {
        id: "day3",
        title: "Day 3: Luxor's Ancient Wonders",
        description: "Fly to Luxor to explore the Valley of the Kings, Karnak Temple Complex, and Luxor Temple along the Nile.",
        insight: {
          type: "cultural",
          text: "The ancient Egyptians believed the east bank of the Nile was for the living (temples) and the west bank for the dead (tombs)."
        }
      }
    ]
  };
}

function generateTurkeyItinerary(days: number, travelStyle: string, budget: string): Itinerary {
  // Implementation similar to above
  return {
    destination: "Turkey",
    duration: days <= 5 ? "short" : days <= 10 ? "medium" : "long",
    days: [
      {
        id: "day1",
        title: "Day 1: Istanbul's Old City",
        description: "Explore Istanbul's historic Sultanahmet district, including Hagia Sophia, Blue Mosque, Topkapi Palace, and Grand Bazaar.",
        insight: {
          type: "cultural",
          text: "Hagia Sophia has served as a Byzantine church, an Ottoman mosque, a secular museum, and is now a mosque again - reflecting Turkey's complex religious history."
        }
      },
      {
        id: "day2",
        title: "Day 2: Bosphorus Cruise",
        description: "Take a cruise on the Bosphorus Strait separating Europe and Asia, then explore the vibrant neighborhoods of Ortaköy and Bebek.",
        insight: {
          type: "food",
          text: "Turkish breakfast (kahvaltı) is a lavish affair with multiple small dishes including cheeses, olives, tomatoes, cucumbers, eggs, jams, and fresh bread."
        }
      },
      {
        id: "day3",
        title: "Day 3: Cappadocia's Landscapes",
        description: "Fly to Cappadocia to witness the surreal landscape of fairy chimneys, and take an optional hot air balloon ride at sunrise.",
        insight: {
          type: "cultural",
          text: "Early Christians carved churches and entire underground cities into Cappadocia's soft volcanic rock to hide from Roman persecution."
        }
      }
    ]
  };
}

function generateGreeceItinerary(days: number, travelStyle: string, budget: string): Itinerary {
  // Implementation similar to above
  return {
    destination: "Greece",
    duration: days <= 5 ? "short" : days <= 10 ? "medium" : "long",
    days: [
      {
        id: "day1",
        title: "Day 1: Athens Acropolis",
        description: "Begin in Athens with a visit to the iconic Acropolis, including the Parthenon, followed by exploring the historic Plaka district.",
        insight: {
          type: "cultural",
          text: "The Parthenon was built in just 9 years, completed in 438 BCE, and represents the pinnacle of Classical Greek architecture."
        }
      },
      {
        id: "day2",
        title: "Day 2: Ancient Delphi",
        description: "Take a day trip to Delphi, considered the center of the world in ancient Greece, to see the Temple of Apollo and ancient theater.",
        insight: {
          type: "cultural",
          text: "The Oracle of Delphi was the most important oracle in the ancient Greek world, with leaders seeking her prophecies before major decisions."
        }
      },
      {
        id: "day3",
        title: "Day 3: Santorini Island",
        description: "Fly to Santorini to explore the whitewashed villages of Oia and Fira perched on the caldera with stunning Aegean Sea views.",
        insight: {
          type: "food",
          text: "Try Santorini specialties like fava (yellow split pea puree), tomatokeftedes (tomato fritters), and wine made from Assyrtiko grapes grown in volcanic soil."
        }
      }
    ]
  };
}

function generateGenericItinerary(destination: string, days: number, travelStyle: string, budget: string): Itinerary {
  // Fallback generic itinerary if no specific one is available
  return {
    destination: destination.charAt(0).toUpperCase() + destination.slice(1),
    duration: days <= 5 ? "short" : days <= 10 ? "medium" : "long",
    days: [
      {
        id: "day1",
        title: "Day 1: Capital Exploration",
        description: `Begin your journey with a tour of the capital city, visiting the main historical sites and cultural landmarks.`,
        insight: {
          type: "cultural",
          text: "Take time to observe local customs and traditions as you explore the historic districts."
        }
      },
      {
        id: "day2",
        title: "Day 2: Cultural Immersion",
        description: "Visit local museums, traditional markets, and participate in a cultural workshop to learn about local crafts.",
        insight: {
          type: "food",
          text: "Don't miss trying the local specialty dishes that represent the authentic flavors of the region."
        }
      },
      {
        id: "day3",
        title: "Day 3: Natural Wonders",
        description: "Take a day trip to explore the natural beauty surrounding the city, from mountains to coastlines.",
      }
    ]
  };
}
