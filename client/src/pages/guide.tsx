import VoiceChat from "@/components/guide/voice-chat";
import { Button } from "@/components/ui/button";

export default function Guide() {
  const popularQuestions = [
    "What's the significance of Holi in Indian culture?",
    "What should I know about dining etiquette in France?",
    "Can you explain the Día de los Muertos celebration?",
    "What are the traditional arts of Bali, Indonesia?"
  ];

  const handleQuestionClick = (question: string) => {
    // This would normally pass the question to the VoiceChat component
    // Since components don't share state directly, in a production app
    // we'd use a context or state management library
    console.log("Question clicked:", question);
    
    // Mock implementation - we're creating a custom event to pass the question
    const event = new CustomEvent('popular-question-selected', { 
      detail: { question } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-gray-100 dark:bg-navy-light min-h-[80vh] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-6">Your AI Cultural Guide</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Ask questions about any culture, tradition, or destination. Speak in your language, and I'll understand.
          </p>
          
          {/* Voice Chat Interface */}
          <VoiceChat />
          
          {/* Popular Questions */}
          <div className="mt-12">
            <h3 className="text-xl font-playfair font-medium mb-4 text-center">Popular Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left p-3 bg-white dark:bg-navy rounded-lg border border-gray-200 dark:border-gray-700 hover:border-olive dark:hover:border-gold transition-300 h-auto"
                  onClick={() => handleQuestionClick(question)}
                >
                  <p className="font-medium flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-olive dark:text-gold mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {question}
                  </p>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Guide Features */}
          <div className="mt-16 bg-white dark:bg-navy p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-playfair font-bold mb-4 text-center">Features of Your AI Cultural Guide</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-skyblue dark:bg-gold rounded-full flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-olive dark:text-navy" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Multilingual Support</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ask questions in your native language. The guide understands and responds in over 30 languages.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-skyblue dark:bg-gold rounded-full flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-olive dark:text-navy" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Cultural Insights</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Deep knowledge about traditions, customs, etiquette, and historical context of cultures worldwide.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-skyblue dark:bg-gold rounded-full flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-olive dark:text-navy" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.878-6.343m-3.634 7.904a9 9 0 012.168-11.378" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Voice Interaction</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Speak directly to your guide and hear responses, making it perfect for on-the-go learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
