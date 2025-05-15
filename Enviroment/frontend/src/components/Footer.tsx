import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  return (
    <footer className={`text-center p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
      <p>{t('footer.copyright')}</p>
    </footer>
  );
};

export default Footer;