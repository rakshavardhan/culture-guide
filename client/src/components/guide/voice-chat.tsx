import { useState, useRef, useEffect } from "react";
import { Mic, Send, MoveUp, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ChatMessage from "./chat-message";
import { useWebSpeech } from "@/hooks/use-web-speech";
import { translateToEnglish } from "@/utils/translate";
import { getCulturalInfo } from "@/utils/ai-guide";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

export default function VoiceChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI Cultural Guide. I can share insights about traditions, heritage sites, local customs, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    startListening, 
    stopListening, 
    transcript, 
    isSpeaking, 
    speak,
    isListeningSupported 
  } = useWebSpeech();
  
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleMicClick = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      startListening();
    }
  };
  
  const clearConversation = () => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm your AI Cultural Guide. I can share insights about traditions, heritage sites, local customs, and more. What would you like to know?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsListening(false);
    
    try {
      // Simulate translation if needed
      const translatedQuery = await translateToEnglish(inputValue);
      
      // Show a loading state
      const loadingMsgId = Date.now().toString();
      setMessages((prev) => [
        ...prev,
        {
          id: loadingMsgId,
          content: "Thinking...",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      
      // Get AI response
      const response = await getCulturalInfo(translatedQuery);
      
      // Replace loading message with actual response
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === loadingMsgId
            ? { ...msg, content: response, id: Date.now().toString() }
            : msg
        )
      );
      
      // Optional: read response aloud
      speak(response);
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "I'm sorry, I encountered an error. Please try again.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  };
  
  return (
    <div className="bg-white dark:bg-navy rounded-xl shadow-lg overflow-hidden">
      {/* Chat messages area */}
      <div id="chatMessages" className="h-96 md:h-[420px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Voice recognition status */}
      {isListening && (
        <div className="m-4 bg-white dark:bg-navy-light p-4 rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-terracotta dark:bg-gold flex items-center justify-center text-white animate-pulse">
              <Mic className="h-6 w-6" />
            </div>
          </div>
          <p className="text-gray-800 dark:text-gray-200 font-medium">Listening...</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Speak your question clearly</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm italic mt-2">{transcript}</p>
        </div>
      )}
      
      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Button 
            type="button"
            onClick={handleMicClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              isListening 
                ? "bg-terracotta hover:bg-terracotta-light dark:bg-red-600 dark:hover:bg-red-700"
                : "bg-olive hover:bg-olive-light dark:bg-gold dark:hover:bg-gold-light dark:text-navy"
            } text-white`}
            disabled={!isListeningSupported}
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <div className="flex-grow relative">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question in any language..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-ivory dark:bg-navy-light"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-olive dark:text-gold hover:text-olive-light dark:hover:text-gold-light"
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            type="button"
            onClick={() => speak(messages[messages.length - 1]?.isUser ? messages[messages.length - 2]?.content : messages[messages.length - 1]?.content)}
            disabled={isSpeaking || messages.length <= 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center ml-3 ${
              isSpeaking 
                ? "bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            } text-gray-600 dark:text-gray-300`}
          >
            <MoveUp className="h-5 w-5" />
          </Button>
        </form>
        
        <div className="flex justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
          <span>Supports 30+ languages</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearConversation}
            className="text-olive dark:text-gold hover:underline flex items-center p-0 h-auto"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Clear conversation
          </Button>
        </div>
      </div>
    </div>
  );
}
