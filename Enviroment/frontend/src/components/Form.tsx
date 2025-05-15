import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormProps {
  isDarkMode: boolean;
}

const Form: React.FC<FormProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState<string>('');
  const [requestDetails, setRequestDetails] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ companyName, requestDetails, contactPerson, email });
  };

  return (
    <div className="flex justify-center mt-8 mx-auto">
           <form onSubmit={handleSubmit} className={`p-6 rounded shadow-md w-[50%] ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
      <h2 className="text-lg font-semibold mb-4">{t('form.title')}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">{t('form.companyName')}</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">{t('form.requestDetails')}</label>
        <textarea
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">{t('form.contactPerson')}</label>
        <input
          type="text"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">{t('form.email')}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-blue-400 text-white p-2 rounded hover:bg-blue-500"
      >
        {t('form.submit')}
      </button>
    </form>
    </div>
  );
};

export default Form;