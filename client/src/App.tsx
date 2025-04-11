import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

// Pages
import Home from "./pages/home";
import Explore from "./pages/explore";
import Planner from "./pages/planner";
import Guide from "./pages/guide";
import Nearby from "./pages/nearby";
import Booking from "./pages/booking";
import Account from "./pages/account";
import About from "./pages/about";
import Contact from "./pages/contact";
import ARView from "./pages/ar-view";
import NotFound from "./pages/not-found";

function Router() {
  const [location, setLocation] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/planner" component={Planner} />
      <Route path="/guide" component={Guide} />
      <Route path="/nearby" component={Nearby} />
      <Route path="/booking" component={Booking} />
      <Route path="/account" component={Account} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/ar/:siteId?" component={ARView} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isARView = location.startsWith('/ar');
  
  return (
    <div className="min-h-screen flex flex-col font-poppins bg-ivory dark:bg-navy text-gray-800 dark:text-cream">
      {!isARView && <Navbar />}
      <main className={`flex-grow ${isARView ? 'p-0' : ''}`}>
        <Router />
      </main>
      {!isARView && <Footer />}
    </div>
  );
}

export default App;
