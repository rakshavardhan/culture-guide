import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "../ui/button";

type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const carouselSlides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Where Culture Meets",
    subtitle: "Technology",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Discover Ancient",
    subtitle: "Traditions",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Experience Local",
    subtitle: "Cultures",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {carouselSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* Hero content */}
      <div className="absolute inset-0 flex items-center justify-center text-center p-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 animate-fadeIn">
            <span className="block">{carouselSlides[currentSlide].title}</span>
            <span className="block text-gold">
              {carouselSlides[currentSlide].subtitle}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-light">
            Discover the world's cultural treasures with your AI-powered travel companion
          </p>
          <Link href="/planner">
            <Button className="inline-block bg-terracotta hover:bg-terracotta-light text-white text-lg px-8 py-6 rounded-lg transition-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Tour
            </Button>
          </Link>
        </div>
      </div>

      {/* Carousel navigation */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide
                ? "bg-white"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
