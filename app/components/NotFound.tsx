export function NotFoundPage({ lang }: {
    lang?: string
  }) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center pt-4 pb-8 gap-4">
        <h3 className="prose max-w-none prose-lg dark:prose-invert self-center text-8xl font-large leading-24 tracking-tight mt-10 font-semibold">404</h3>
        <p className="prose max-w-none prose-lg dark:prose-invert self-center text-4xl font-large tracking-tight mt-10 font-semibold">
          {lang === "ru" ? "Такой страницы нет" : "There is no such page"}
        </p>
      </section>
    )
  }