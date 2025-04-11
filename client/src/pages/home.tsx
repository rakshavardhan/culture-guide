import { useEffect, useRef } from "react";
import HeroCarousel from "@/components/home/hero-carousel";
import FeaturedDestinations from "@/components/home/featured-destinations";
import HowItWorks from "@/components/home/how-it-works";
import TestimonialCarousel from "@/components/home/testimonial-carousel";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (sectionsRef.current) {
      const elements = sectionsRef.current.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      if (sectionsRef.current) {
        const elements = sectionsRef.current.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <div ref={sectionsRef}>
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Featured Destinations */}
      <FeaturedDestinations />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Testimonials */}
      <TestimonialCarousel />
      
      {/* CTA Section */}
      <section className="py-16 bg-terracotta dark:bg-gold text-white dark:text-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6 animate-on-scroll opacity-0 transform translate-y-4">
            Ready to Experience Culture Like Never Before?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-on-scroll opacity-0 transform translate-y-4">
            Join thousands of travelers who have discovered hidden cultural gems with Cultura Guide.
          </p>
          <Link href="/planner">
            <Button 
              className="bg-white text-terracotta dark:bg-navy dark:text-gold font-bold px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-300 transform hover:-translate-y-1 animate-on-scroll opacity-0 flex items-center justify-center"
            >
              Start Planning Now
            </Button>
          </Link>
        </div>
      </section>
      
      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
