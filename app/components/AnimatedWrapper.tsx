"use client"

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const pageVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedWrapper({ children, className = "" }: {
  children: React.ReactNode;
  className?: string;
}) {
  const { lang } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <motion.div
      key={lang.toString()}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={pageVariants}
      transition={{ duration: 0.4, ease: "easeInOut", delay: .2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
