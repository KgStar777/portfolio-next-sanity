import Navbar from "@/components/Navbar";
import type { LanguageType } from "@/models/LanguageType";
import { LanguageContextProvider } from "@/context/LanguageContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { FloatingContact } from "@/components/FloatingContact";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import Footer from "@/components/Footer";

export default function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string }
}) {
  return (
    <LanguageContextProvider defaultLanguage={params.lang?.toUpperCase() as LanguageType}>
      <ThemeContextProvider>
        <div className="min-h-screen flex flex-col">
          <FloatingContact />
          <AnimatedWrapper>
            <Navbar />
          </AnimatedWrapper>
          <main className="flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow container">
            {children}
          </main>
          <Footer className="space-y-2 xl:gap-x-8 xl:space-y-0" lang={params.lang} />
        </div>
      </ThemeContextProvider>
    </LanguageContextProvider>
  );
}
