import { Suspense } from "react";

import { BackButton } from "@/app/components/BackButton";
import { client } from "@/app/lib/sanity";
import { Crsl } from '@/app/components/Crsl';
import type { ProjectDataWithGallery } from "@/app/models/ProjectData";


async function asyncFunc(projectId: string) {
  const query = `*[_type == "gallery" && name == "${projectId}"] {
    title,
    overview,
    overviewRu,
    link,
    github,
    _id,
    name,
    "imageUrl": gallery.images[].asset->url,
  }`;

  const data = await client.fetch(query);

  return data;
}

export const revalidate = 60;

export default async function Gallery(
  { params: { projectId, lang }
}: {
  params: { projectId: string, lang: string }
}) {
  const data: ProjectDataWithGallery[] = await asyncFunc(projectId);

  if (!data?.[0]) {
    return (
      <div className="items-center space-y-2 xl:grid xl:grid-cols-1 xl:gap-x-8 xl:space-y-0 xl:items-start">
        <div className="flex flex-col pt-4 pb-8 justify-between gap-4">
          <BackButton />
          <h3 className="self-center text-4xl font-large leading-8 tracking-tight mt-10 font-semibold">
            {lang === "ru" ? "Такого проекта нет" : "There is no such project"}
          </h3>
        </div>
      </div>
    )
  }

  return (
    <section className="w-full max-w-full flex flex-col overflow-hidden">
      <div className="items-center space-y-2 xl:grid xl:grid-cols-1 xl:gap-x-8 xl:space-y-0 xl:items-start">
        <div className="flex flex-col pt-4 pb-8 justify-between gap-4">
          <BackButton />
          <h3 className="self-end justify-self-end text-4xl font-large leading-8 tracking-tight ml-2 font-semibold">
            {lang === "ru" ? data?.[0].titleRu : data?.[0].title}
          </h3>
        </div>
      </div>

      <Suspense fallback={
        lang === "ru"
          ? <>Загрузка...</>
          : <>Loading...</>
        }>
          <Crsl images={data?.[0].imageUrl} />
      </Suspense>

      <div className="w-full max-w-full overflow-hidden prose prose-lg pt-8 pb-7 dark:prose-invert xl:col-span-2">
        <p>{lang === "ru" ? data?.[0]?.overviewRu : data?.[0]?.overview}</p>
        <div className="flex flex-col truncate overflow-hidden">
          {
            data?.[0]?.link !== null && !/^uv/.test(data?.[0]?.link) && (
              <div className="truncate flex flex-wrap items-center gap-1">
                <span>{lang === "ru" ? "ссылка на сайт: " : "link to site: "}</span>
                <a className="truncate px-2 py-1 hover:bg-teal-500" href={data[0].link}>{data[0].link}</a>
              </div>
            )
          }
          {
            data?.[0]?.github !== null && (
              <div className="truncate flex flex-wrap items-center gap-1">
                <span>{`${lang === "ru" ? "ссылка на" : "link to"} github: `}</span>
                <a className="truncate ps-0 py-1 hover:bg-teal-500" href={data[0].github}>{data[0].github}</a>
              </div>
            )
          } 
        </div>
      </div>
    </section>
  )
}
