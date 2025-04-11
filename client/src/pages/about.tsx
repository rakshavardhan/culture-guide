import { Users, Zap, Globe, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="bg-ivory dark:bg-navy min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-olive dark:bg-gold text-white dark:text-navy">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-center">About Cultura Guide</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-center font-light">
            Bridging cultures through technology, one journey at a time.
          </p>
        </div>
      </div>
      
      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-playfair font-bold mb-10 text-center">Our Mission</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-4">
              At Cultura Guide, we believe that cultural understanding is the foundation of meaningful travel. 
              Our mission is to create deeper connections between travelers and the cultures they encounter, 
              through technology that educates, inspires, and guides.
            </p>
            <p className="mb-4">
              Founded in 2023, we combine cutting-edge AI technology with cultural expertise to provide 
              travelers with insights that go beyond typical tourist information. We're committed 
              to promoting respectful cultural exchange and supporting local communities around the world.
            </p>
            <p>
              Through our platform, we aim to make authentic cultural experiences accessible to all travelers, 
              regardless of their background or language. We believe travel has the power to broaden perspectives 
              and foster global understanding—and we're here to help you make the most of every journey.
            </p>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-navy-light">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-playfair font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-navy p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-skyblue/20 dark:bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-olive dark:text-gold" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Cultural Respect</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We promote respectful engagement with cultures and traditions around the world.
              </p>
            </div>
            
            <div className="bg-white dark:bg-navy p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-skyblue/20 dark:bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-olive dark:text-gold" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Authentic Experiences</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We prioritize genuine cultural immersion over superficial tourist attractions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-navy p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-skyblue/20 dark:bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-olive dark:text-gold" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We harness technology to enhance human connection and cultural understanding.
              </p>
            </div>
            
            <div className="bg-white dark:bg-navy p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-skyblue/20 dark:bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-olive dark:text-gold" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Inclusivity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We strive to make cultural exploration accessible to travelers of all backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-playfair font-bold mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-md">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Emma Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-playfair font-bold text-center mb-2">Emma Chen</h3>
              <p className="text-center text-olive dark:text-gold font-medium mb-3">Co-founder & CEO</p>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Cultural anthropologist and technology entrepreneur with a passion for sustainable tourism.
              </p>
            </div>
            
            <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-md">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Raj Patel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-playfair font-bold text-center mb-2">Raj Patel</h3>
              <p className="text-center text-olive dark:text-gold font-medium mb-3">Co-founder & CTO</p>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                AI specialist with expertise in natural language processing and cross-cultural communication.
              </p>
            </div>
            
            <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-md">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Sofia Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-playfair font-bold text-center mb-2">Sofia Rodriguez</h3>
              <p className="text-center text-olive dark:text-gold font-medium mb-3">Head of Content</p>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Travel writer and cultural researcher who has visited over 50 countries documenting local traditions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-terracotta dark:bg-gold text-white dark:text-navy">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">How Cultura Guide Works</h2>
          <p className="text-xl mb-10">
            Our AI-powered platform bridges the gap between technology and cultural exploration.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-white dark:bg-navy flex items-center justify-center text-terracotta dark:text-gold text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-playfair font-bold mb-2">Explore</h3>
              <p>Discover destinations through our cultural lens and find experiences that resonate with your interests.</p>
            </div>
            
            <div>
              <div className="w-16 h-16 rounded-full bg-white dark:bg-navy flex items-center justify-center text-terracotta dark:text-gold text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-playfair font-bold mb-2">Plan</h3>
              <p>Create personalized itineraries with our AI assistant that understands cultural nuances and preferences.</p>
            </div>
            
            <div>
              <div className="w-16 h-16 rounded-full bg-white dark:bg-navy flex items-center justify-center text-terracotta dark:text-gold text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-playfair font-bold mb-2">Experience</h3>
              <p>Travel with our AI guide providing real-time cultural context and language assistance.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-playfair font-bold mb-12 text-center">Our Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center h-24 grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="UNESCO" 
                className="h-12 object-contain"
              />
            </div>
            <div className="flex items-center justify-center h-24 grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="World Tourism Organization" 
                className="h-12 object-contain"
              />
            </div>
            <div className="flex items-center justify-center h-24 grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="Cultural Heritage Foundation" 
                className="h-12 object-contain"
              />
            </div>
            <div className="flex items-center justify-center h-24 grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="Global Sustainable Tourism Council" 
                className="h-12 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
