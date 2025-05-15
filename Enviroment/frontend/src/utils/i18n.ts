import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          header: {
            title: "Company Requests Portal",
            toggleTheme: "Toggle Theme",
            language: "Language",
            arabic: "Arabic",
            english: "English"
          },
          form: {
            title: "Submit a New Request",
            companyName: "Company Name:",
            requestDetails: "Request Details:",
            contactPerson: "Contact Person:",
            email: "Email:",
            submit: "Submit Request",
          },
          footer: {
            copyright: "© 2025 Company Requests Portal. All rights reserved."
          }
        }
      },
      ar: {
        translation: {
          header: {
            title: "بوابة طلبات الشركات",
            toggleTheme: "تبديل الوضع",
            language: "اللغة",
            arabic: "عربي",
            english: "English"
          },
          form: {
            title: "رفع طلب جديد",
            companyName: "اسم الشركة:",
            requestDetails: "تفاصيل الطلب:",
            contactPerson: "اسم جهة الاتصال:",
            email: "البريد الإلكتروني:",
            submit: "إرسال الطلب",
          },
          footer: {
            copyright: "© 2025 بوابة طلبات الشركات. جميع الحقوق محفوظة."
          }
        }
      }
    },
    lng: "ar",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;