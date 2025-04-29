"use client"

import Link from "next/link";
import { MouseEventHandler } from "react";
import { usePathname, useRouter } from "next/navigation";

import { links } from "@/site-config";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer({ lang, className }: {
  lang: string;
  className?: string;
}) {
  let pathname = usePathname() || "/";
  const router = useRouter();
  const { availableLanguages } = useLanguage();
  
  const BACKGROUND_COLOR = 'bg-teal-500';
  const GRADIENT_COLOR = 'from-white dark:from-[rgb(9,9,8,1)]';
  const MIN_HEIGHT = 'min-h-[200px]';
  const currentYear = new Date().getFullYear();
  const creationYear = 2023;
  
  const onValueChanged: (language: string) => MouseEventHandler<HTMLButtonElement> = (language) => (e) => {
    const segments = pathname.split('/');
    const normalizedValue = language.toString().toLowerCase();
    const isLangSegment = availableLanguages.some(lang => lang === segments[1].toUpperCase());
    const newPath = isLangSegment
      ? `/${normalizedValue}/${segments.slice(2).join('/')}`
      : `/${normalizedValue}`;
    if (isLangSegment) {
      router.push(newPath);
    } else {
      router.push("/");
    }
  }

  const getLinkPath = (path: string) => {
    return `/${lang}${path}`;
  };

  return (
    <div className={`
      ${className}
      ${MIN_HEIGHT}
      ${BACKGROUND_COLOR}
      bg-gradient-to-b ${GRADIENT_COLOR} to-transparent
      flex flex-row justify-around items-end
      pb-10
      overflow-hidden
      max-w-none prose-lg prose dark:prose-invert
    `}>
      <div className="flex flex-col items-center gap-5 self-end">
        <div className="flex flex-col gap-[.9]">
          <h4 className="text-teal-500 uppercase text-sm">{lang === "ru" ? "Сайт" : "Site"}</h4>
          {links.map((link, idx) => (
            <Link
              href={getLinkPath(link.to)}
              key={idx}
              scroll
              prefetch
              className={"font-normal text-white dark:prose-invert dark:text-gray-300 inline-flex items-center text-sm no-underline"}
            >{lang === "ru" ? link.titleRu : link.titleEng}</Link>
          ))}   
        </div>
        <div className="flex gap-4">
          {availableLanguages
            .map((language, idx) => 
              <button className="text-white dark:prose-invert text-sm" key={idx} onClick={onValueChanged(language)}>{language}</button>
          )}
        </div>
      </div>
      <p className="text-white dark:prose-invert text-sm mb-0 pb-0">©{creationYear} - {currentYear}</p>
    </div>
  )
} 