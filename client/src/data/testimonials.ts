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
    name: "Sarah L.",
    location: "Traveled to Kyoto, Japan",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
    rating: 5,
    text: "Cultura Guide transformed my trip to Japan. The AI guide taught me so much about the temples and traditions that I would have missed otherwise. It felt like having a local friend showing me around!"
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Traveled to Barcelona, Spain",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.5,
    text: "The trip planner saved me hours of research. It suggested places I never would have found on my own, and every recommendation was spot on. Can't imagine traveling without it now."
  },
  {
    id: 3,
    name: "Elena F.",
    location: "Traveled to Istanbul, Turkey",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    text: "As a solo female traveler, having the cultural context from the AI guide was invaluable. It helped me understand local customs and navigate interactions with confidence and respect."
  },
  {
    id: 4,
    name: "James W.",
    location: "Traveled to Marrakech, Morocco",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4.8,
    text: "The multilingual features were incredible - I could speak English, and locals could hear my questions in Arabic. The cultural insights about Moroccan etiquette prevented so many potential faux pas!"
  },
  {
    id: 5,
    name: "Akira Y.",
    location: "Traveled to Rome, Italy",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 5,
    text: "The depth of historical information was impressive. Standing in the Colosseum while the app explained not just facts, but the cultural significance and daily life in ancient Rome made history come alive."
  },
  {
    id: 6,
    name: "Carlos M.",
    location: "Traveled to Cusco, Peru",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.7,
    text: "The trip planning feature was fantastic for our family vacation. It suggested child-friendly cultural activities that kept both the adults and kids engaged and learning about Incan culture."
  }
];

export default testimonials;
