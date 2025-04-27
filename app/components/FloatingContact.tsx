"use client"

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Me from "@/public/grey-me.jpg";

const ANIMATION_DURATION = 0.4;

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [disableHover, setDisableHover] = useState(false);
  const { lang } = useParams();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisableHover(true);
    setIsClosing(true);
    setIsOpen(false);
  };

  useEffect(() => {
    const warn = console.warn;
    console.warn = (...args) => {
      if (args[0] && args[0].includes("You are trying to animate background")) {
        return;
      }
      warn(...args);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setIsClosing(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setIsClosing(false);
  }, [lang]);

  return (
    <motion.div
      key="contact-button"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, y: -12 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: ANIMATION_DURATION, ease: "easeInOut", delay: .2 }}
    >
      <motion.div
        className="fixed right-8 bottom-8 overflow-hidden flex flex-col items-start justify-start z-[1001] bg-white dark:bg-black"
        initial="circle"
        animate={isOpen ? "expanded" : "circle"}
        onMouseEnter={() => {
          return;
        }}
        onMouseLeave={() => {
          setDisableHover(false);
        }}
        whileHover={!disableHover && !isOpen ? "pill" : "open"}
        variants={{
          circle: {
            width: 80,
            height: 80,
            borderRadius: 100,
            transition: { type: "easeInOut", duration: ANIMATION_DURATION },
            background: "rgb(255, 255, 255, 1)",
            color: "rgb(255, 255, 255)",
          },
          pill: {
            width: 260,
            height: 80,
            borderRadius: 100,
            transition: { type: "easeInOut", duration: ANIMATION_DURATION },
            // background: isClosing ? "rgb(255, 255, 255, .1)" : "black",
            boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.1)",
            background: "rgb(255, 255, 255)",
            color: "rgb(255, 255, 255)",
            cursor: "pointer",
          },
          expanded: {
            width: 280,
            height: 316,
            padding: 24,
            borderRadius: 38,
            transition: { type: "easeInOut", duration: ANIMATION_DURATION },
            boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.1)",
            background: "rgb(255, 255, 255, 1)",
            color: "rgb(0, 0, 0)",
          },
        }}
        onClick={() => setIsOpen(true)}
        exit={{
          x: 100,
          y: -100,
          opacity: 0,
          transition: { duration: ANIMATION_DURATION },
        }}
        onAnimationComplete={() => {
          setTimeout(() => setIsClosing(false), 300);
        }}
      >
        <motion.div
          className="flex flex-col w-full h-full box-border"
          layout
          transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
        >
          <div className="h-full flex items-center gap-4 justify-start">
            <Image
              src={Me}
              alt="Avatar"
              width={80}
              height={80}
              // width={72}
              // height={72}
              // className="rounded-full ml-1 border-4 border-white object-cover select-none"
              className="border-4 border-white rounded-full object-top object-cover select-none"
            />

            <motion.div
              initial={{ opacity: 1 }}
              animate={isClosing ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
            >
              {/* <h2 className="truncate text-xl font-normal leading-6 text-center divide-gray-100 dark:divide-gray-700 "> */}
              <h2 className="w-full pr-5 truncate text-lg uppercase font-normal leading-6 text-center text-black [text-shadow:_1px_1px_0_white,_-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white] dark:divide-gray-100">
                {lang === "ru" ? "Для связи" : "Contact Me"}
              </h2>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isOpen
                ? { opacity: 1, pointerEvents: "auto" }
                : { opacity: 0, pointerEvents: "none" }
            }
            transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
            className="w-8 cursor-pointer absolute top-5 right-4 select-none"
          >
            <button className="w-full" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>

          <motion.div
            className="w-full h-full flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-1.5 pt-2">
              <p className="text-[#6e6e6e] font-normal text-lg leading-5">
                Phone
              </p>
              <Link
                href="tel:+79164599193"
                className="font-normal text-xl leading-[22px] no-underline divide-gray-100 dark:divide-gray-700"
              >
                +7 916 459 91 93
              </Link>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[#6e6e6e] font-normal text-lg leading-5">
                Email
              </p>
              <Link
                href="mailto:unrivaled-candidate@proton.me"
                className="font-normal text-xl leading-[22px] no-underline divide-gray-100 dark:divide-gray-700"
              >
                unrivaled-candidate@proton.me
              </Link>
            </div>

            <Link
              href="https://t.me/dania_sych"
              className="flex items-center justify-center h-12 rounded-full font-normal text-[17px] leading-5 bg-black text-white no-underline"
              target="_blank"
            >
              Telegram
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
