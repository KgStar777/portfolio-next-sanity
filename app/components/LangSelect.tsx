"use client";

import { useContext, useEffect, useState } from "react";
import { Lang, LanguageContext, langs } from "../context/LangContext";
// import { LangsEnum, Langs } from "../context/LangContext";

// export type Lang = "RU" | "ENG";
// export const langs: Lang[] = ["RU", "ENG"];
export default function LangSelect() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  console.log(language),
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div
        // onMouseEnter={() => setIsOpen(true)}
        // onMouseLeave={() => setIsOpen(false)}
        className="relative inline-block text-left"
      >
        <div>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            type="button"
            // className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            className="border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {language}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        {
          isOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black dark:border-teal-900 border border-gray-100"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              // tabindex="-1"
            >
              <div className="py-1" role="none">
                {
                  langs.map((lang) => (
                    <a
                      key={lang}
                      onClick={() => {
                        setLanguage(lang)
                      // setLang(lang);
                      setIsOpen(false);
                    }}
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm dark:text-gray-300 dark:hover:text-white" role="menuitem"
                    // tabindex="-1"
                    id="menu-item-0">{lang}</a>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </>

    // <button
    //   onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    //   className="bg-teal-500/30 p-2 rounded-lg text-teal-500"
    // >
    //   {resolvedTheme === "dark" ? (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    //       />
    //     </svg>
    //   ) : (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    //       />
    //     </svg>
    //   )}
    // </button>
    
  );
}
