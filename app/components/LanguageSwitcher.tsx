import { usePathname, useRouter } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import Dropdown, { DropDownValue } from "./Dropdown";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { language, availableLanguages } = useLanguage();
  let pathname = usePathname() || "/";
  
  const onValueChanged = (value: DropDownValue) => {
    const segments = pathname.split('/');
    const normalizedValue = value.toString().toLowerCase();
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

  return <Dropdown initValue={language} data={availableLanguages} onValueChanged={onValueChanged} />
}
