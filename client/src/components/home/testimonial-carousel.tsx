import { useState, useEffect } from "react";
import { User } from "lucide-react";

type Testimonial = {
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
    text: "Cultura Guide transformed my trip to Japan. The AI guide taught me so much about the temples and traditions that I would have missed otherwise. It felt like having a local friend showing me around!",
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Traveled to Barcelona, Spain",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.5,
    text: "The trip planner saved me hours of research. It suggested places I never would have found on my own, and every recommendation was spot on. Can't imagine traveling without it now.",
  },
  {
    id: 3,
    name: "Elena F.",
    location: "Traveled to Istanbul, Turkey",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    text: "As a solo female traveler, having the cultural context from the AI guide was invaluable. It helped me understand local customs and navigate interactions with confidence and respect.",
  },
];

export default function TestimonialCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused]);
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={`empty-star-${i}`} className="h-5 w-5 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };
  
  return (
    <section id="testimonials" className="py-16 bg-white dark:bg-navy-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12 animate-on-scroll">What Travelers Say</h2>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`transition-opacity duration-500 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
              } bg-ivory dark:bg-navy p-6 md:p-8 rounded-xl shadow-md`}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex text-gold mb-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">{testimonial.text}</p>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Testimonial navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide 
                    ? "bg-olive dark:bg-gold" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-olive dark:hover:bg-gold"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
