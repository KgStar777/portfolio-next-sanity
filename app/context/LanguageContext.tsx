"use client";

import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { availableLanguages, LanguageType } from '../layout';
import { useParams, useRouter } from 'next/navigation';

interface ILanguageContextProviderProps {
  children: ReactNode;
  defaultLanguage: LanguageType;
}

interface LanguageContextModel {
  language: LanguageType;
  languageLC: string;
  setLanguage: Dispatch<SetStateAction<any>>;
  availableLanguages: LanguageType[];
}

export const LanguageContext = createContext<LanguageContextModel | undefined>(undefined);

export const LanguageContextProvider = ({
  children,
  defaultLanguage
}: ILanguageContextProviderProps) => {
  const [language, setLanguageState] = useState<LanguageType>(defaultLanguage);
  const { lang } = useParams();
  const router = useRouter();

  const loadLanguage = () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageType;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }

  useEffect(() => {
    const convertedLanguage = lang.toString().toUpperCase();
    if ((availableLanguages.findIndex(i => i === convertedLanguage) !== -1)) {
      setLanguage(convertedLanguage as LanguageType);
      return;
    }
    loadLanguage();
  }, [lang])

  // При монтировании компонента проверяем localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageType;
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: LanguageType) => {
    if (availableLanguages.findIndex(i => i === lang.toUpperCase()) !== -1) {
      setLanguageState(lang);

      // Сохраняем в localStorage только на клиенте
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferredLanguage', lang)
      }
    }
  }

  return (
    <LanguageContext.Provider value={{
      language,
      languageLC: language.toLowerCase(),
      setLanguage,
      availableLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context;
}