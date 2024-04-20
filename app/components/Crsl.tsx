"use client"

import React from 'react'; 
import Image from "next/image";
import Carousel from "react-multi-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};

export const Crsl = ({
  images,
}: {
  images: string[],
}) => { 
  return ( 
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      transitionDuration={500}
    >
      {
        images?.length > 0 && images.map((item, idx) => (
            <article
              key={idx}
              className="overflow-hidden dark:border-zinc-600 rounded-lg border border-gray-100 bg-white shadow-lg dark:bg-black dark:border-teal-900 mx-1"
            >
              <div className="h-80 w-full relative" key={idx}>
                <Image
                  fill
                  src={item}
                  alt="Image of the project"
                  className="w-full h-full object-cover"
                />
              </div>
            </article>
          )
        )
      }
    </Carousel>
  );
}