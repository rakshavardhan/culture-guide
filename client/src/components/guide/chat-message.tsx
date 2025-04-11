import { User, Bot } from "lucide-react";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

type ChatMessageProps = {
  message: Message;
};

export default function ChatMessage({ message }: ChatMessageProps) {
  if (message.isUser) {
    return (
      <div className="flex items-start justify-end">
        <div className="mr-3 bg-olive dark:bg-gold text-white dark:text-navy rounded-lg py-2 px-4 max-w-[80%]">
          <p>{message.content}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0 flex items-center justify-center">
          <User className="h-6 w-6 text-gray-500" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-skyblue dark:bg-gold flex items-center justify-center text-white dark:text-navy flex-shrink-0">
          <Bot className="h-6 w-6" />
        </div>
        <div className="ml-3 bg-gray-100 dark:bg-navy-light rounded-lg py-2 px-4 max-w-[80%]">
          {message.content === "Thinking..." ? (
            <div className="flex space-x-1 my-2">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          ) : (
            <p className="text-gray-800 dark:text-gray-200">{message.content}</p>
          )}
        </div>
      </div>
    );
  }
}
