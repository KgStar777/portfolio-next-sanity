"use client";

import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

export type Lang = "RU" | "ENG";
export const langs: Lang[] = ["RU", "ENG"];

interface ILanguageContextProviderProps {
  children: ReactNode;
}

interface LanguageContextModel {
  language: Lang;
  setLanguage: Dispatch<SetStateAction<any>>;
}

export const LanguageContext = createContext<LanguageContextModel>(null);

export const LanguageContextProvider = ({
  children
}: ILanguageContextProviderProps) => {
  const [language, setLanguage] = useState<Lang>(langs[0]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}