import BookingForm from "@/components/booking/booking-form";

export default function Booking() {
  return (
    <div className="bg-gray-100 dark:bg-navy-light py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-6">
          Book Your Cultural Experience
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Secure your spot for an authentic cultural journey through our easy booking process.
        </p>
        
        <BookingForm />
        
        {/* Why Book with Us Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-playfair font-bold text-center mb-8">Why Book with Cultura Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-olive/10 dark:bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-olive dark:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find a lower price? We'll match it and give you an additional 10% discount on your booking.
              </p>
            </div>
            
            <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-olive/10 dark:bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-olive dark:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Flexible Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Plans change? No problem. Modify or cancel your booking up to 48 hours before your experience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-olive/10 dark:bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-olive dark:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Transactions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your payment and personal information are protected with industry-leading encryption and security.
              </p>
            </div>
          </div>
        </div>
        
        {/* Customer Testimonial */}
        <div className="max-w-3xl mx-auto mt-16 bg-white dark:bg-navy p-8 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
              <img 
                src="https://randomuser.me/api/portraits/women/42.jpg" 
                alt="Sarah L." 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex text-gold mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "Booking through Cultura Guide was seamless! Our guide was knowledgeable and passionate about the local culture. The tea ceremony and temple visits they arranged were authentic experiences we would have never found on our own."
              </p>
              <div>
                <h4 className="font-bold">Sarah L.</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Traveled to Kyoto, Japan • March 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
