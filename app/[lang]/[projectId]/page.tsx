import { Suspense, Fragment } from "react";

import { BackButton } from "@/app/components/BackButton";
import { client } from "@/app/lib/sanity";
import { Crsl } from '@/app/components/Crsl';
import type { ProjectDataWithGallery } from "@/app/models/ProjectData";


async function asyncFunc(projectId: string) {
  const query = `*[_type == "gallery" && name == "${projectId}"] {
    title,
    overview,
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

  return (
    <Fragment>
      <div className="items-center space-y-2 xl:grid xl:grid-cols-1 xl:gap-x-8 xl:space-y-0 xl:items-start">
        <div className="flex flex-col pt-4 pb-8 justify-between gap-4">
          <BackButton />
          <h3 className="self-end justify-self-end text-4xl font-large leading-8 tracking-tight ml-2 font-semibold">
            {lang === "ru" ? data[0].titleRu : data[0].title}
          </h3>
        </div>
      </div>

      <Suspense fallback={lang === "ru"
        ? <>Загрузка...</>
        : <>Loading...</>}>
        <div className="h-84 rounded-md overflow-hidden bg-cover bg-center">
          <Crsl images={data[0].imageUrl} />
        </div>
      </Suspense>

      <div className="prose max-w-none prose-lg pt-8 pb-7 dark:prose-invert xl:col-span-2">
        <p>{lang === "ru" ? data[0].overviewRu : data[0].overview}</p>
        <div>
          {
            data[0]?.link !== null && !/^uv/.test(data[0]?.link) && (
              <Fragment>
                <span>{lang === "ru" ? "ссылка на сайт: " : "link to site: "}</span>
                <a className="pb-1 pt-1 ps-2 pe-2 hover:bg-teal-500" href={data[0].link}>{data[0].link}</a>
              </Fragment>
            )
          }
          {
            data[0]?.github !== null && (
              <Fragment>
                <span>{`${lang === "ru" ? "ссылка на" : "link to"} github: `}</span>
                <a className="pb-1 pt-1 ps-2 pe-2 hover:bg-teal-500" href={data[0].github}>{data[0].github}</a>
              </Fragment>
            )
          }
          
        </div>
      </div>
    </Fragment>
  )
}
