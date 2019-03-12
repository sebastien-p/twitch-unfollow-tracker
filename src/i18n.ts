import i18next from 'i18next';
import xhrBackend from 'i18next-xhr-backend';
import browserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { setLocale } from 'yup';

setLocale({ mixed: { required: 'required' } });

export const i18n: Promise<i18next.TFunction> = i18next
  .use(xhrBackend)
  .use(browserLanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    returnEmptyString: false,
    fallbackLng: 'en'
  });

export function formatDateTime(locale: string, date: Date | string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(typeof date === 'string' ? new Date(date) : date);
};
