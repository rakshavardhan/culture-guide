export type Testimonial = {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Traveled to Kyoto, Japan",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.8,
    text: "The AR features brought ancient temples to life! I learned so much about the history and culture that I would have missed otherwise."
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Traveled to Venice, Italy",
    image: "https://randomuser.me/api/portraits/men/92.jpg",
    rating: 4.9,
    text: "The personalized itinerary was perfect. Every restaurant recommendation was authentic and amazing. Made our honeymoon truly special."
  },
  {
    id: 3,
    name: "Anjali Gupta",
    location: "Traveled to Petra, Jordan",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    rating: 5.0,
    text: "Having a local guide through the AI chat was incredibly helpful. Got insider tips that made our adventure unforgettable."
  },
  {
    id: 4,
    name: "Vikram Malhotra",
    location: "Traveled to Machu Picchu, Peru",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 4.7,
    text: "The voice-guided tours were a game-changer. Could explore at our own pace while learning fascinating facts about the Incan civilization."
  },
  {
    id: 5,
    name: "Meera Iyer",
    location: "Traveled to Rome, Italy",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 5,
    text: "The depth of historical information was impressive. Standing in the Colosseum while the app explained not just facts, but the cultural significance and daily life in ancient Rome made history come alive."
  },
  {
    id: 6,
    name: "Raj Kapoor",
    location: "Traveled to Cusco, Peru",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.7,
    text: "The trip planning feature was fantastic for our family vacation. It suggested child-friendly cultural activities that kept both the adults and kids engaged and learning about Incan culture."
  }
];

export default testimonials;