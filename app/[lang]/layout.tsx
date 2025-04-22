import { LanguageContextProvider } from "../context/LanguageContext";
import { ThemeContextProvider } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import { LanguageType } from "../layout";
import { FloatingContact } from "../components/FloatingContact";
import { AnimatedWrapper } from "../components/AnimatedWrapper";

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
        <FloatingContact />
        <AnimatedWrapper>
        <Navbar />
        </AnimatedWrapper>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </ThemeContextProvider>
    </LanguageContextProvider>
  );
}
