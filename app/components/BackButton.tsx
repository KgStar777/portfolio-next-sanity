"use client"

import { useParams, useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
    const { lang } = useParams();
  const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  )

  return (
    <div onClick={() => {
      router.back()
    }} className="w-fit flex items-center">
      <div className="h-full w-8 cursor-pointer">
        <BackIcon />
      </div>
      <span className="px-2 cursor-pointer text-lg text-gray-500 dark:text-gray-300 dark:hover:text-white">
        {lang === "ru" ? "Назад" : "Back"}
      </span>
    </div>
  )
}