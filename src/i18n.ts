import { useMemo } from 'react';
import i18next from 'i18next';
import xhrBackend from 'i18next-xhr-backend';
import browserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';
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

export function useDateLocalization(date: string): string {
  const { i18n: { language } } = useTranslation();

  const formatter: Intl.DateTimeFormat = useMemo(
    () => new Intl.DateTimeFormat(language, {
      year: 'numeric',
      month: 'long',
      weekday: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    [language]
  );

  return useMemo(
    () => formatter.format(new Date(date)),
    [formatter, date]
  );
}
