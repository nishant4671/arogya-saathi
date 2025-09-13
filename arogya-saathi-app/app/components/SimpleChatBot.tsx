'use client';

import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatSuggestionsProps {
  onSuggestionClick: (question: string) => void;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    "How do I book an appointment?",
    "Where can I find my medical records?",
    "How to order medicine?",
    "What should I do in an emergency?",
    "How do I find nearby facilities?",
    "Where can I get mental health support?"
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

const SimpleChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined responses based on keywords
  const responseRules = [
    {
      keywords: ['hello', 'hi', 'hey', 'hola', 'namaste'],
      responses: [
        'Hello! I\'m Arogya Saathi Assistant. How can I help you today?',
        'Hi there! How can I assist with your healthcare needs?',
        'Namaste! I\'m here to help with your health questions.'
      ]
    },
    {
      keywords: ['appointment', 'book', 'schedule'],
      responses: [
        'You can book appointments in the "Appointments" section of your dashboard.',
        'To schedule an appointment, go to the Appointments page and select your preferred time.',
        'Appointment booking is available in the Appointments section.'
      ]
    },
    {
      keywords: ['medicine', 'drug', 'pill', 'prescription'],
      responses: [
        'You can manage your medicines in the "Medicine" section.',
        'For medicine-related queries, please visit the Medicine section of your dashboard.',
        'Medicine orders and information are available in the Medicine section.'
      ]
    },
    {
      keywords: ['emergency', 'help', 'urgent', 'emergencies'],
      responses: [
        'For emergencies, please use the red "Emergency Help" button for immediate assistance.',
        'In case of emergency, use the Emergency button to get immediate help.',
        'Emergency services are available through the Emergency button on your screen.'
      ]
    },
    {
      keywords: ['record', 'medical history', 'report', 'records'],
      responses: [
        'Your medical records are available in the "Records" section.',
        'You can access your medical history in the Records section of your dashboard.',
        'All your medical reports are stored in the Records section.'
      ]
    },
    {
      keywords: ['doctor', 'physician', 'dr', 'doc'],
      responses: [
        'Our doctors are available for consultations. You can book an appointment to see one.',
        'You can view available doctors and their schedules in the Appointments section.',
        'Our medical team includes qualified doctors specializing in various fields.'
      ]
    },
    {
      keywords: ['thank', 'thanks', 'appreciate', 'thank you'],
      responses: [
        'You\'re welcome! Is there anything else I can help with?',
        'Happy to help! Let me know if you need anything else.',
        'Glad I could assist you!'
      ]
    },
    {
      keywords: ['covid', 'corona', 'pandemic', 'covid-19'],
      responses: [
        'For COVID-19 related concerns, please contact your nearest healthcare facility.',
        'Information about COVID-19 testing and vaccination is available at government health centers.',
        'Please follow official health guidelines for COVID-19 prevention.'
      ]
    },
    {
      keywords: ['facility', 'hospital', 'clinic', 'health center'],
      responses: [
        'You can find nearby healthcare facilities using the "Find Facility Near Me" button in the Quick Actions section.',
        'To locate healthcare facilities near you, use the map feature in the Quick Actions section.',
        'The "Find Facility Near Me" feature will help you locate the closest healthcare providers.'
      ]
    },
    {
      keywords: ['mental health', 'mental', 'depression', 'anxiety'],
      responses: [
        'For mental health support, please use the "Get Mental Health Help" button in the Quick Actions section.',
        'You can access mental health resources through the mental health help feature.',
        'Mental health support is available via the dedicated mental health button in Quick Actions.'
      ]
    }
  ];

  // Default response if no keywords match
  const defaultResponses = [
    "I'm not sure I understand. Could you please rephrase your question?",
    "I don't have information about that yet. Please try asking something else.",
    "I'm still learning about healthcare. Could you ask about appointments, medicines, or records?",
    "That's beyond my current knowledge. Please contact our support team for assistance.",
    "I'm designed to help with healthcare queries. Could you ask about appointments, medicines, or health records?"
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Welcome message when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        text: 'Hello! I\'m Arogya Saathi Assistant. I can help with information about appointments, medicines, records, emergencies, and more. How can I help you today?', 
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Check for matching keywords
    for (const rule of responseRules) {
      if (rule.keywords.some(keyword => lowerMessage.includes(keyword))) {
        // Return a random response from the matching rule
        return rule.responses[Math.floor(Math.random() * rule.responses.length)];
      }
    }
    
    // Return a random default response if no keywords match
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage: ChatMessage = { 
      text: inputMessage, 
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: ChatMessage = { 
        text: botResponse, 
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
          aria-label="Open chat"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Arogya Saathi Assistant</h3>
              <p className="text-xs opacity-80">Online - We're here to help</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {message.text}
                  <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Chat suggestions */}
            {messages.length === 1 && (
              <ChatSuggestions onSuggestionClick={(question) => setInputMessage(question)} />
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 border border-gray-300 rounded-l-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Type your message"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ''}
                className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleChatBot;