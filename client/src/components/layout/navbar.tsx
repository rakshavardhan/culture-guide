import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Globe, Menu, X } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Trip Planner", href: "/planner" },
    { name: "AI Guide", href: "/guide" },
    { name: "Nearby", href: "/nearby" },
    { name: "Book", href: "/booking" },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-ivory dark:bg-navy shadow-md transition-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Globe className="text-olive dark:text-gold h-6 w-6 mr-2" />
              <span className="font-playfair font-bold text-xl md:text-2xl text-olive dark:text-gold">
                Cultura Guide
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 font-inter">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className={`${isActive(item.href) 
                  ? 'text-olive dark:text-gold font-medium'
                  : 'hover:text-olive dark:hover:text-gold transition-300'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
            
            <Link href="/account">
              <Button variant="default" className="hidden md:flex ml-4 bg-olive hover:bg-olive-light dark:bg-gold dark:text-navy dark:hover:bg-gold-light">
                Account
              </Button>
            </Link>
            
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3 font-inter">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2 py-1 rounded ${isActive(item.href)
                    ? 'bg-gray-200 dark:bg-navy-light text-olive dark:text-gold'
                    : 'hover:bg-gray-200 dark:hover:bg-navy-light'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/account"
                className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-navy-light"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
