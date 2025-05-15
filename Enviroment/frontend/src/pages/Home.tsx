import React, { useState } from 'react'
import { useEffect } from 'react'
import Header from '../components/Header'
import Form from '../components/Form'
import Footer from '../components/Footer'
import i18n from '../utils/i18n'

function Home() {
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
    <div>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} changeLanguage={changeLanguage} />
      <main className="flex-grow p-4">
        <Form isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

export default Home