import { headers } from "next/headers";

import { getProprityLanguages } from "@/utils/getProprityLanguages";

export const isMobile = (userAgent: string): boolean => {
    return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
  };

export function useHeaders() {
    const userAgent = headers().get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    const languages = headers().get("accept-language") || "";

    const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";
    return {
        priorityLanguage,
        mobileCheck
    }
}