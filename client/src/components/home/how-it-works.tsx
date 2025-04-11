import { useEffect, useRef } from "react";
import { Map, Route, Bot } from "lucide-react";

type Step = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <Map className="h-12 w-12" />,
    title: "Explore Destinations",
    description: "Browse our curated collection of cultural destinations around the world.",
  },
  {
    icon: <Route className="h-12 w-12" />,
    title: "Plan Your Trip",
    description: "Use our AI-powered planner to create a personalized itinerary.",
  },
  {
    icon: <Bot className="h-12 w-12" />,
    title: "Meet Your AI Guide",
    description: "Get cultural insights and real-time guidance from your AI travel companion.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll(".animate-on-scroll");
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("visible");
            }, index * 200);
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 bg-gray-100 dark:bg-navy">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12 animate-on-scroll">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 animate-on-scroll opacity-0 transform translate-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-skyblue dark:bg-gold text-olive dark:text-navy text-2xl mb-4">
                {step.icon}
              </div>
              <h3 className="font-playfair font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
