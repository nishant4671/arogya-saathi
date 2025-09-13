'use client';

import React from 'react';

interface ChatSuggestionsProps {
  onSuggestionClick: (question: string) => void;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    "How do I book an appointment?",
    "Where can I find my medical records?",
    "How to order medicine?",
    "What should I do in an emergency?"
  ];

  return (
    <div className="mt-4">
      <p className="text-xs text-gray-500 mb-2">Try asking:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestions;