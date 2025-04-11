export type Destination = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  region: string;
  highlights: string[];
  bestTimeToVisit: string;
};

const destinations: Destination[] = [
  {
    id: 1,
    name: "Kyoto, Japan",
    description: "Immerse yourself in the ancient traditions of Japan's cultural capital.",
    image: "https://images.unsplash.com/photo-1599620919128-a95eeb2d38de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 2158,
    tags: ["Heritage", "Spiritual"],
    region: "asia",
    highlights: ["Fushimi Inari Shrine", "Kinkaku-ji (Golden Pavilion)", "Arashiyama Bamboo Grove", "Gion District", "Traditional Tea Ceremony"],
    bestTimeToVisit: "March-May for cherry blossoms, October-November for autumn colors"
  },
  {
    id: 2,
    name: "Venice, Italy",
    description: "Experience the floating city's timeless beauty and artistic heritage.",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 1856,
    tags: ["Romantic", "Art"],
    region: "europe",
    highlights: ["Grand Canal", "St. Mark's Basilica", "Doge's Palace", "Rialto Bridge", "Murano Glass Blowing"],
    bestTimeToVisit: "April-May or September-October to avoid crowds and summer heat"
  },
  {
    id: 3,
    name: "Marrakech, Morocco",
    description: "Discover vibrant markets, exotic flavors and architectural wonders.",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 1743,
    tags: ["Food", "Markets"],
    region: "africa",
    highlights: ["Jemaa el-Fnaa Square", "Bahia Palace", "Majorelle Garden", "Souk Markets", "Traditional Hammam"],
    bestTimeToVisit: "March-May or September-November for pleasant temperatures"
  },
  {
    id: 4,
    name: "Angkor Wat, Cambodia",
    description: "The world's largest religious monument, blending Hindu and Buddhist traditions.",
    image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 2523,
    tags: ["Heritage", "Spiritual"],
    region: "asia",
    highlights: ["Angkor Wat Sunrise", "Bayon Temple", "Ta Prohm (Tomb Raider Temple)", "Banteay Srei", "Angkor Thom"],
    bestTimeToVisit: "November-February during the dry season with cooler temperatures"
  },
  {
    id: 5,
    name: "Machu Picchu, Peru",
    description: "The iconic Incan citadel set amidst breathtaking mountain scenery.",
    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 3241,
    tags: ["Heritage", "Nature"],
    region: "americas",
    highlights: ["Inca Trail", "Sun Gate", "Huayna Picchu Climb", "Temple of the Sun", "Sacred Valley"],
    bestTimeToVisit: "May-September during the dry season with clearer views"
  },
  {
    id: 6,
    name: "Istanbul, Turkey",
    description: "Where East meets West, offering rich cultural fusion and architectural marvels.",
    image: "https://images.unsplash.com/photo-1543429257-2b13a540c0c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 1876,
    tags: ["Food", "Art"],
    region: "europe",
    highlights: ["Hagia Sophia", "Blue Mosque", "Topkapi Palace", "Grand Bazaar", "Bosphorus Cruise"],
    bestTimeToVisit: "April-May or September-October for mild weather and fewer crowds"
  },
  {
    id: 7,
    name: "Varanasi, India",
    description: "One of the world's oldest continuously inhabited cities, sacred to Hindus.",
    image: "https://images.unsplash.com/photo-1568797629192-908f6f1cfbcf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviews: 1342,
    tags: ["Spiritual", "Food"],
    region: "asia",
    highlights: ["Ganges River Ceremonies", "Sunrise Boat Ride", "Kashi Vishwanath Temple", "Sarnath Buddhist Site", "Evening Aarti Ceremony"],
    bestTimeToVisit: "November-February when temperatures are cooler"
  },
  {
    id: 8,
    name: "Petra, Jordan",
    description: "The ancient city carved into pink sandstone cliffs, a wonder of engineering.",
    image: "https://images.unsplash.com/photo-1519922639192-e73293ca430e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 2074,
    tags: ["Heritage", "Art"],
    region: "asia",
    highlights: ["The Treasury", "The Monastery", "Royal Tombs", "Petra by Night", "High Place of Sacrifice"],
    bestTimeToVisit: "March-May or September-November to avoid extreme temperatures"
  }
];

export default destinations;
