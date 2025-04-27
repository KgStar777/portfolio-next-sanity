import Image from "next/image";
import Me from "@/public/grey-me.jpg";
import ProjectList from "@/components/ProjectList";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";

import { client } from "../lib/sanity";

async function getContacts() {
  const query = `*[_type == "contacts"] {
    link,
    _id,
    name,
  }`;

  const data = await client.fetch(query);

  return data;
}

export const revalidate = 60;

export default async function Home({ params }: {
  params: { lang: string }
}) {
  const contacts = await getContacts();
  const contactsMap = new Map();
  const isEng = params.lang !== "ru"

  contacts.forEach((contact: {
    name: string;
    link: string;
  }) => {
    contactsMap.set(contact.name, contact.link);
  });

  return (
    <div className="divide-gray-100 dark:divide-gray-700">
      <div className="items-center space-y-2 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-16">
          <Image
            alt="Picture of jan marshal"
            src={Me}
            className="h-48 w-48 rounded-full object-cover object-top"
          />
          <h3 className="pt-4 text-2xl font-bold leading-8 tracking-tight">
              <AnimatedWrapper>{isEng ? "Developer" : "Разработчик"}</AnimatedWrapper>
          </h3>

          <div className="flex space-x-5 pt-4">
            <a href={contactsMap.get("github")} target="_blank" title="github">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-8 h-8 text-teal-500 hover:text-teal-600"
              >
                <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
              </svg>
            </a>
            <a href={contactsMap.get("telegram")} target="_blank" title="telegram">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-teal-500 hover:text-teal-600"
              >
                <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
              </svg>
            </a>
            <a href={contactsMap.get("email")} target="_blank" title="email">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-8 h-8 text-teal-500 hover:text-teal-600"
              >
                {/* <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" /> */}
                <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z" />
              </svg>
            </a>
            {/* <a href="" target="_blank">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-8 h-8 text-teal-500 hover:text-teal-600"
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 01-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 01-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 00229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z" />
              </svg>
            </a> */}
          </div>
        </div>
      </div>
      <ProjectList lang={params.lang} />
      <div className="space-y-2 pt-16 md:space-x-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-13">
          <AnimatedWrapper>{isEng ? "About me" : "Обо мне"}</AnimatedWrapper>
        </h1>
      </div>
      <div className="prose max-w-none prose-lg pt-6 pb-7 dark:prose-invert xl:col-span-2">
        {isEng ? (
          <>
            My tech stack: HTML, CSS, JavaScript, TypeScript, React, React Hook Form, React Query, Redux Toolkit, Next.js, Node.js, Tailwind, NGINX, Git, and other modern web development technologies. I have worked with high-load systems built on microservice architecture as part of product teams, as well as contributed to small and mid-sized projects, including e-commerce solutions.

            I stay up to date with the latest trends in web development and continuously improve my skills. I enjoy tackling complex challenges that help me gain a deeper understanding of technologies and expand my expertise. Outside of work, I pursue creative projects—writing music and editing videos.

            My main goal is to grow professionally, take part in meaningful projects, and build innovative products. I am open to new challenges and look forward to the future with excitement, eager to see what opportunities lie ahead in my career.
            {/* <p>
              Hey everyone my name is Daniil, I am experienced Frontend/Full-stack developer with a proven 
              track record of designing and implementing robust web applications. 
              Proficient in both frontend and backend technologies, adept at problem-solving, 
              and committed to delivering high-quality code. Skilled in Agile methodologies and 
              collaborative teamwork.
            </p>
            <p>
              Implemented RESTful APIs with Node.js and Express.js.
              As a Frontend developer, I developed user-friendly interfaces using React/Next, reducing page load time.
              Used state managers such as mobx, redux-toolkit, zustand. I’m also already familiar with many popular libraries.
            </p>
            <p>
              Here you can get acquainted with some of the projects in which I took part, including the pet projects with which my journey began.
              I will be glad to interest you.
            </p> */}
          </>
        ) : (
          <>
          Мой технический стек: HTML, CSS, JavaScript, TypeScript, React, React Hook Form, React Query, Redux Toolkit, Next.js, Node.js, Tailwind, NGINX, Git и другие современные технологии для веб-разработки. Я работал с высоконагруженными системами, построенными на микросервисной архитектуре, в составе продуктовых команд, а также участвовал в разработке небольших и средних проектов, включая e-commerce решения.  

          Я слежу за актуальными трендами в веб-разработке и постоянно совершенствую свои навыки. Мне интересны сложные задачи, которые помогают глубже разбираться в технологиях и расширять экспертизу. Вне работы я занимаюсь творчеством — пишу музыку и монтирую видео.  
          
          Моя главная цель — профессионально расти, участвовать в значимых проектах и создавать инновационные продукты. Я готов к новым вызовам и с интересом смотрю в будущее, чтобы увидеть, какие возможности откроются в моей карьере.
          </>
        )}
      </div>
    </div>
  );
}
