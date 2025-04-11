import { useState, useEffect, useCallback } from "react";

interface UseWebSpeechReturn {
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  isListening: boolean;
  speak: (text: string) => void;
  isSpeaking: boolean;
  isListeningSupported: boolean;
  isSpeakingSupported: boolean;
  resetTranscript: () => void;
}

export function useWebSpeech(): UseWebSpeechReturn {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [isListeningSupported, setIsListeningSupported] = useState(false);
  const [isSpeakingSupported, setIsSpeakingSupported] = useState(false);

  // Initialize Web Speech API
  useEffect(() => {
    // Speech Recognition setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
      setIsListeningSupported(true);
    } else {
      console.warn('Speech Recognition API is not supported in this browser.');
      setIsListeningSupported(false);
    }
    
    // Speech Synthesis setup
    if (window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
      setIsSpeakingSupported(true);
    } else {
      console.warn('Speech Synthesis API is not supported in this browser.');
      setIsSpeakingSupported(false);
    }
    
    // Cleanup
    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognition && isListeningSupported) {
      try {
        recognition.start();
        setIsListening(true);
        setTranscript("");
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  }, [recognition, isListeningSupported]);

  const stopListening = useCallback(() => {
    if (recognition && isListeningSupported && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListeningSupported, isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  const speak = useCallback((text: string) => {
    if (speechSynthesis && isSpeakingSupported) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error', event);
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  }, [speechSynthesis, isSpeakingSupported]);

  return {
    startListening,
    stopListening,
    transcript,
    isListening,
    speak,
    isSpeaking,
    isListeningSupported,
    isSpeakingSupported,
    resetTranscript,
  };
}
