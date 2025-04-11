import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertTripSchema, insertBookingSchema, insertContactMessageSchema } from "@shared/schema";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);
  // API routes
  app.get("/api/destinations", (_req, res) => {
    res.json({
      destinations: [
        { id: 1, name: "Kyoto, Japan", description: "Immerse yourself in the ancient traditions of Japan's cultural capital.", image: "https://images.unsplash.com/photo-1599620919128-a95eeb2d38de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", rating: 4.9, tags: ["Heritage"] },
        { id: 2, name: "Venice, Italy", description: "Experience the floating city's timeless beauty and artistic heritage.", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", rating: 4.7, tags: ["Romantic"] },
        { id: 3, name: "Marrakech, Morocco", description: "Discover vibrant markets, exotic flavors and architectural wonders.", image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", rating: 4.8, tags: ["Food"] },
        { id: 4, name: "Angkor Wat, Cambodia", description: "The world's largest religious monument, blending Hindu and Buddhist traditions.", image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", rating: 4.9, tags: ["Heritage", "Spiritual"] },
        { id: 5, name: "Machu Picchu, Peru", description: "The iconic Incan citadel set amidst breathtaking mountain scenery.", image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", rating: 4.8, tags: ["Heritage", "Nature"] },
        { id: 6, name: "Istanbul, Turkey", description: "Where East meets West, offering rich cultural fusion and architectural marvels.", image: "https://images.unsplash.com/photo-1543429257-2b13a540c0c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", rating: 4.7, tags: ["Food", "Art"] },
        { id: 7, name: "Varanasi, India", description: "One of the world's oldest continuously inhabited cities, sacred to Hindus.", image: "https://images.unsplash.com/photo-1568797629192-908f6f1cfbcf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", rating: 4.6, tags: ["Spiritual", "Food"] },
        { id: 8, name: "Petra, Jordan", description: "The ancient city carved into pink sandstone cliffs, a wonder of engineering.", image: "https://images.unsplash.com/photo-1519922639192-e73293ca430e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", rating: 4.9, tags: ["Heritage", "Art"] }
      ]
    });
  });

  // Trip Planner API
  app.post("/api/trips", async (req, res) => {
    try {
      const tripData = insertTripSchema.parse(req.body);
      // For now, default userId to 1 since we don't have auth
      const trip = await storage.createTrip({ ...tripData, userId: 1 });
      
      res.status(201).json({ trip });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid trip data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create trip" });
      }
    }
  });

  app.get("/api/trips/:id", async (req, res) => {
    try {
      const tripId = parseInt(req.params.id);
      const trip = await storage.getTrip(tripId);
      
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.json({ trip });
    } catch (error) {
      res.status(500).json({ message: "Failed to get trip" });
    }
  });

  // Booking API
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      // For now, default userId to 1 since we don't have auth
      const booking = await storage.createBooking({ ...bookingData, userId: 1 });
      
      res.status(201).json({ booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      const booking = await storage.getBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json({ booking });
    } catch (error) {
      res.status(500).json({ message: "Failed to get booking" });
    }
  });

  // Contact API
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      
      res.status(201).json({ message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
