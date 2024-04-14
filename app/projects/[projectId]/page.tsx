import { Suspense, Fragment } from "react";

import { Crsl } from '@/app/components/Crsl';

import { client } from "../../lib/sanity";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

interface Data {
  title: string;
  overview: string;
  link: string;
  _id: string;
  name: string;
  imageUrl: string[];
  gallery: {
    images: Array<{
      _type: string
      _key: string
      asset: {
        url: string
      },
    }>,
  }
  // images: Array<{
  //   _type: string
  //   _key: string
  // }>,
}

async function asyncFunc(projectId: string) {
  const query = `*[_type == "gallery" && name == "${projectId}"] {
    title,
    overview,
    link,
    _id,
    name,
    "imageUrl": gallery.images[].asset->url,
  }`;

  const data = await client.fetch(query);

  return data;
}

export const revalidate = 60;

export default async function Gallery(
  { params: { projectId }
}: {
  params: { projectId: string }
}) {
    const data: Data[] = await asyncFunc(projectId);

  return (
    <Fragment>
      <div className="items-center space-y-2 xl:grid xl:grid-cols-1 xl:gap-x-8 xl:space-y-0 xl:items-start">
        <div className="flex flex-col items-end pt-8">
          <h3 className="pt-4 pb-8 text-4xl font-large leading-8 tracking-tight ml-2 font-semibold">
            {data[0].title}
          </h3>
        </div>
      </div>

      <Suspense fallback={<>Loading...</>}>
        <div className="h-84 rounded-md overflow-hidden bg-cover bg-center">
          <Crsl images={data[0].imageUrl} />
        </div>
      </Suspense>

      <div className="prose max-w-none prose-lg pt-8 pb-7 dark:prose-invert xl:col-span-2">
        <p>{data[0].overview}</p>
        <div>
          <span>link to site: </span>
          <a className="pb-1 pt-1 ps-2 pe-2 hover:bg-teal-500" href={data[0].link}>{data[0].link}</a>
        </div>
      </div>
    </Fragment>
  )
}
