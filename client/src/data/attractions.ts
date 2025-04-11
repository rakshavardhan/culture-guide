export type Attraction = {
  id: string;
  name: string;
  description: string;
  image: string;
  distance: number; // in km
  rating: number;
  category: string;
  address: string;
  url?: string;
  hasAR?: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

// Mock attractions data
const attractions: Attraction[] = [
  {
    id: "attr1",
    name: "Temple of Ancient Wisdom",
    description: "A stunning 12th-century temple with intricate carvings depicting cultural stories and mythology. The temple offers a glimpse into the spiritual practices of the region's ancient civilization.",
    image: "https://images.unsplash.com/photo-1602301747631-3aa9584d9f3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: 1.2,
    rating: 4.8,
    category: "Heritage",
    address: "15 Temple Road, Heritage District",
    url: "https://example.com/temple",
    hasAR: true,
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  },
  {
    id: "attr2",
    name: "Cultural History Museum",
    description: "This museum houses artifacts dating back over 2,000 years, showcasing the rich history and traditions of the local people. Interactive exhibits bring ancient rituals to life.",
    image: "https://images.unsplash.com/photo-1566127992631-137a642a90f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: 0.8,
    rating: 4.6,
    category: "Museum",
    address: "42 Museum Avenue, Downtown",
    hasAR: true,
    coordinates: {
      latitude: 40.7138,
      longitude: -74.0059
    }
  },
  {
    id: "attr3",
    name: "Traditional Craft Workshop",
    description: "Experience hands-on traditional craft-making with local artisans. Learn techniques passed down through generations while creating your own cultural souvenir.",
    image: "https://images.unsplash.com/photo-1529332662-6079dec85442?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: 1.5,
    rating: 4.9,
    category: "Workshop",
    address: "7 Artisan Street, Old Quarter",
    url: "https://example.com/craftworkshop",
    coordinates: {
      latitude: 40.7135,
      longitude: -74.0070
    }
  },
  {
    id: "attr4",
    name: "Sacred Garden Sanctuary",
    description: "A peaceful oasis featuring traditional garden design principles and rare medicinal plants. The gardens have been maintained using ancient techniques for over 300 years.",
    image: "https://images.unsplash.com/photo-1585128903994-9788298932a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: 2.3,
    rating: 4.7,
    category: "Nature",
    address: "88 Tranquil Path, Eastern District",
    coordinates: {
      latitude: 40.7150,
      longitude: -74.0040
    }
  },
  {
    id: "attr5",
    name: "Heritage Food Market",
    description: "This bustling market offers authentic local cuisine and ingredients. Sample traditional dishes prepared using centuries-old recipes and cooking methods.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: 1.1,
    rating: 4.5,
    category: "Food",
    address: "23 Market Square, River District",
    url: "https://example.com/foodmarket",
    coordinates: {
      latitude: 40.7120,
      longitude: -74.0065
    }
  },
  {
    id: "attr6",
    name: "Cultural Performance Theater",
    description: "Watch traditional dance, music, and theatrical performances that tell stories of cultural significance. The theater preserves performance arts that date back many centuries.",
    image: "https://images.unsplash.com/photo-1559519529-0936e4058364?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: 1.8,
    rating: 4.8,
    category: "Performance",
    address: "36 Theater Street, Arts Quarter",
    url: "https://example.com/theater",
    coordinates: {
      latitude: 40.7122,
      longitude: -74.0045
    }
  },
  {
    id: "attr7",
    name: "Ancient Textile Exhibition",
    description: "Marvel at the intricate patterns and techniques of traditional textiles. This exhibition showcases weaving methods and designs specific to the region's cultural identity.",
    image: "https://images.unsplash.com/photo-1573767291321-c0af2eaf5266?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: 0.9,
    rating: 4.4,
    category: "Art",
    address: "10 Weaver's Lane, Craft District",
    coordinates: {
      latitude: 40.7115,
      longitude: -74.0058
    }
  },
  {
    id: "attr8",
    name: "Ceremonial Plaza",
    description: "This historic plaza has been the site of important cultural ceremonies for centuries. The surrounding architecture reflects various periods of the region's history.",
    image: "https://images.unsplash.com/photo-1548957460-c4d7c74556e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: 0.5,
    rating: 4.7,
    category: "Heritage",
    address: "1 Central Plaza, Heart of City",
    hasAR: true,
    coordinates: {
      latitude: 40.7129,
      longitude: -74.0061
    }
  }
];

/**
 * Get nearby attractions based on latitude and longitude
 * 
 * In a real app, this would connect to a geolocation-based API
 * This is a mock function that returns random attractions with randomized distances
 */
export async function getNearbyAttractions(
  latitude: number,
  longitude: number,
  radius: number = 5 // km
): Promise<Attraction[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For this demo, we'll return the mock attractions with randomized distances
  return attractions.map(attraction => ({
    ...attraction,
    // Generate a random distance between 0.1 and the specified radius
    distance: parseFloat((Math.random() * radius).toFixed(1)) + 0.1
  }))
  // Sort by distance (closest first)
  .sort((a, b) => a.distance - b.distance);
}

export default attractions;
