import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';
import i18n from './utils/i18n'; 
import Home from './pages/Home';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ar'; 
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language); 
  }, [language]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Home />
    </div>
  );
}

export default App;