'use client';

import React, { useState } from 'react';

interface LanguageOption {
  code: 'en' | 'pa' | 'hi';
  name: string;
  nativeName: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
];

const LanguageSwitch: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'pa' | 'hi'>('en');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (code: 'en' | 'pa' | 'hi') => {
    setCurrentLanguage(code);
    setIsOpen(false);
    // Here you would typically update the application language context
  };

  const currentLang = languageOptions.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          {currentLang?.nativeName || 'English'}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languageOptions.map((language) => (
              <button
                key={language.code}
                onClick={() => selectLanguage(language.code)}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  currentLanguage === language.code
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="menuitem"
              >
                {language.nativeName} ({language.name})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;