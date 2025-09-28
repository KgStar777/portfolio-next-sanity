"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// (опционально) объявим тип для window.ym
declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

const ymId = process.env.NEXT_PUBLIC_YM_ID
  ? Number(process.env.NEXT_PUBLIC_YM_ID)
  : undefined;

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ymId || typeof window === "undefined" || !window.ym) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    // Отправляем hit на каждую смену маршрута
    window.ym(ymId, "hit", url, {
      referer: document.referrer || undefined,
      // Можно прокинуть заголовок страницы, если нужно:
      // title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
