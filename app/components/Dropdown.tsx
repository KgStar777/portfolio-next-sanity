"use client";

import { useEffect, useState } from "react";

export type DropDownValue = number | string;

interface IDropDownProps<T extends DropDownValue> {
  initValue: string;
  data: T[];
  onValueChanged: (value: T) => void;
}

export default function Dropdown<T>(props: IDropDownProps<DropDownValue>) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="relative inline-block text-left">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            type="button"
            className="border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {props.initValue}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

        {
          isOpen && (
            <div
              className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black dark:border-teal-900 border border-gray-100"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              // tabindex="-1"
            >
              <div className="py-1" role="none">
                {
                  props.data.map((lang) => (
                    <a key={lang}
                      onClick={() => {
                        props.onValueChanged(lang)
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
  );
}
