import { useCycle } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDimensions } from "@/hooks/useDimension";

const useSmallNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height, width } = useDimensions(containerRef);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(15px at 24px 34px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const body = document.querySelector("body");

  useEffect(() => {
    if (isOpen) {
      body?.classList.add("no-scroll");
    } else {
      body?.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return { toggleOpen, height, width, sidebar, isOpen, containerRef };
};

export default useSmallNav;
