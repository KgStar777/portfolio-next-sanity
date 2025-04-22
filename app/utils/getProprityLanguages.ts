function findFirstAvailable(priorities: string[], available: string[]) {
  for (let i = 0; i < priorities.length; i++) {
      if (available.includes(priorities[i])) {
          return priorities[i];
      }
  }
  return null;
}


export function getProprityLanguages(acceptLanguage: string, available: string[]): string | null {
  const languages = acceptLanguage.split(',');

  const languagePriority: { [key: string]: number } = {};

  languages?.forEach(lang => {
      const parts = lang.split(';');
      const language = parts[0].trim();

      let priority = 1.0; // Значение q по умолчанию
      if (parts.length > 1 && parts[1].startsWith('q=')) {
          priority = parseFloat(parts[1].substring(2));
      }

      languagePriority[language] = priority;
  });

  // Сортируем языки по приоритету
  const sortedLanguages = Object.keys(languagePriority).sort((a, b) => {
      return languagePriority[b] - languagePriority[a]; // Сортировка по убыванию
  });

  return findFirstAvailable(sortedLanguages, ["en", "ru"]);
}