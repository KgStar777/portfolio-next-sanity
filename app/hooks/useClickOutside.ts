import { RefCallback, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Хук для обработки кликов вне элемента
 * @param onClose - callback, вызываемый при клике вне элемента
 * @param isActive - флаг активности хука (опционально)
 * @returns ref - callback ref для присвоения целевому элементу
 */
export const useClickOutside = <T extends HTMLElement>(
  onClose: () => void,
  isActive: boolean = true
): RefCallback<T> => {
  const elementRef = useRef<T | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (
        isActive &&
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [isActive, onClose]
  );

  useEffect(() => {
    if (!isActive) return;

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside, isActive]);

  // Возвращаем callback ref вместо useRef
  return useCallback((node: T | null) => {
    elementRef.current = node;
  }, []);
};