import { Link } from "wouter";
import { Globe, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Globe className="text-gold h-6 w-6 mr-2" />
              <span className="font-playfair font-bold text-xl">Cultura Guide</span>
            </div>
            <p className="text-gray-400 mb-4">
              Where culture meets technology. Discover the world's cultural treasures with your AI-powered travel companion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-gray-400 hover:text-gold transition-300">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/planner" className="text-gray-400 hover:text-gold transition-300">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray-400 hover:text-gold transition-300">
                  AI Cultural Guide
                </Link>
              </li>
              <li>
                <Link href="/nearby" className="text-gray-400 hover:text-gold transition-300">
                  Nearby Attractions
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-gold transition-300">
                  Book Experiences
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-gold transition-300">
                  Our Mission
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-gold transition-300">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-gold transition-300">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold transition-300">
                  Partners
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-gold transition-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to receive travel inspiration and special offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="w-full rounded-l-lg focus:outline-none bg-gray-700 text-white border-0"
              />
              <Button type="submit" className="bg-gold text-navy px-4 py-2 rounded-r-lg hover:bg-gold-light">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11h2v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Cultura Guide. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 text-sm hover:text-gold transition-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 text-sm hover:text-gold transition-300">Terms of Service</a>
            <a href="#" className="text-gray-400 text-sm hover:text-gold transition-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
