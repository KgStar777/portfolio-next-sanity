import { client } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";

import type { ProjectData } from "@/models/ProjectData";
import { AnimatedWrapper } from "./AnimatedWrapper";

async function getProjects() {
  const query = `*[_type == "gallery"] {
    title,
    titleRu,
    overview,
    overviewRu,
    link,
    _id,
    name,
    "imageUrl": gallery.images[0].asset->url,
  }`;

  const data = await client.fetch(query);

  return data;
}

export const revalidate = 60;


export default async function ProjectList(props: { lang: string }) {
  const data: ProjectData[] = await getProjects();

  const linkToProject = (name: string) => {
    return `/${props.lang}/${name}`
  }
  
  return (
    <section className="divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-10 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          <AnimatedWrapper>{props.lang === "ru" ? "Проекты" : "Projects"}</AnimatedWrapper>
        </h1>
      </div>

      <div className="grid gap-y-8 sm:gap-6 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 pt-8">
        {data.map((project) => (
          <article
            key={project._id}
            className="overflow-hidden dark:border-zinc-600 rounded-lg border border-gray-100 bg-white shadow-lg dark:bg-black dark:border-teal-900"
          >
            <div className="h-56 w-full relative">
            <Link
                href={linkToProject(project.name)}
                prefetch
                className="self-end group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-500"
              >
                <Image
                  fill
                  src={project.imageUrl}
                  alt="Image of the project"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>

            <div className="p-4 sm:p-6">
              <a href={project.link} target="_blank">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {props.lang === "ru" ? project.titleRu : project.title}
                </h3>
              </a>

              <p className=" line-clamp-3 mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {props.lang === "ru" ? project.overviewRu : project.overview}
              </p>
              
              <Link
                href={linkToProject(project.name)}
                prefetch
                className="self-end group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-500"
              >{props.lang === "ru" ? "Подробнее" : "Learn More!"}
                <span className="block transition-all group-hover:ms-0.5">
                  &rarr;
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}