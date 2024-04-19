"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Themebutton from "./Themebutton";
import LangSelect from "./LangSelect";
import { useContext } from "react";
import { LanguageContext } from "../context/LangContext";

const getIcon = (open: boolean) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={open ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
    />
  </svg>
);

const links = [
  {
    titleEng: "About me",
    titleRu: "Обо мне",
    to: "/",
  },
  {
    titleEng: "Projects",
    titleRu: "Проекты",
    to: "/projects",
  },
];

export default function Navbar() {
  // const { language } = useContext(LanguageContext);
  let pathname = usePathname() || "/";
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justfiy-between h-16 mt-2">
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <Link href="/">
                    <h1 className="text-2xl font-medium">
                      <span className="text-white dark:text-black bg-teal-500 p-1 border-teal-500 font-bold me-2">{String("portfolio").toUpperCase()}</span>
                      Daniil <span className="text-teal-500">Sychev</span>
                    </h1>
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                  {links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.to}
                      prefetch
                      className={`${
                        pathname === link.to
                          ? "border-teal-500 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      }`}
                      // >{language[0] ? link.titleEng : link.titleRu}</Link>
                    >{link.titleEng}</Link>
                  ))}
                  {/* <LangSelect /> */}
                  <Themebutton />
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Themebutton />
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:hover:bg-gray-800">
                  {getIcon(open)}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* <Link
                href="/"
                prefetch
              >
                Home
              </Link> */}
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.to}
                  prefetch
                  className={`${
                    pathname === link.to
                      ? "bg-teal-50  border-teal-500 text-teal-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-teal-500 block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                  } `}
                // >{language[0] ? link.titleEng : link.titleRu}</Link>
                >{link.titleEng}</Link>
              ))}
              <LangSelect />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
