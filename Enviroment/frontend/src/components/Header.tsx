import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faLanguage } from '@fortawesome/free-solid-svg-icons'; 
import i18n from '../utils/i18n';
import { useEffect } from 'react';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  changeLanguage: (lang: string) => void;
}



const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode, changeLanguage }) => {
  const { t } = useTranslation();
  
 const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ar'; 
  });

    useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language); 
  }, [language]);

  return (
    <header className={`p-4 flex justify-between items-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-500 to-blue-400'} text-white`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-xl font-bold">{t('header.title')}</h1>
      <div className="flex items-center">
        <button onClick={toggleTheme} className="mr-4 p-2 hover:bg-gray-700 rounded" aria-label="Toggle theme">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} /> 
        </button>
        <button onClick={() => changeLanguage('ar')} className="mr-2 p-2 hover:bg-gray-700 rounded" aria-label="Arabic">
          <FontAwesomeIcon icon={faLanguage} /> 
        </button>
        <button onClick={() => changeLanguage('en')} className="p-2 hover:bg-gray-700 rounded" aria-label="English">
          <FontAwesomeIcon icon={faLanguage} />
        </button>
      </div>
    </header>
  );
};

export default Header;