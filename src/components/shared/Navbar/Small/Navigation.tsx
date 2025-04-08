"use client";
import * as React from "react";
import { motion } from "framer-motion";
import NavLink from "../Menu/NavLink";
import useWindowSize from "@/hooks/useWindowSize";
import { usePathname } from "next/navigation";
import LanguageSwitch from "../../LanguageSwitch";
import { useTranslation } from "react-i18next";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Itemvariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const Navigation = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => {
  const { width } = useWindowSize();

  const pathname = usePathname();
  const [changes, setChanges] = React.useState(0);
  const { t } = useTranslation();

  React.useEffect(() => {
    setChanges((prev) => prev + 1);
  }, [pathname]);

  React.useEffect(() => {
    if (isOpen) {
      toggle && toggle();
    }
  }, [changes]);

  const itemIds: React.ReactNode[] = [
    <LanguageSwitch key={1} />,
    <NavLink key={2} href={"/"} classNames="font-bold text-base">
      {t("task:home")}
    </NavLink>,
    <NavLink key={3} href={"/about"} classNames="font-bold text-base">
      {t("task:about")}{" "}
    </NavLink>,
    <NavLink key={4} href={"/benefits"} classNames="font-bold text-base">
      {t("task:benefits")}
    </NavLink>,
    <NavLink key={5} href={"/settings"} classNames="font-bold text-base">
      Settings
    </NavLink>,
    <NavLink key={6} href={"/profile"} classNames="font-bold text-base">
      Profile
    </NavLink>,
  ];

  return (
    <motion.ul
      variants={variants}
      className={`absolute top-28 z-20 flex w-max flex-col gap-4 p-0 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0 transition-all delay-1000"
      }`}
    >
      {itemIds.map((el, idx) => (
        <MenuItem key={idx} el={el} toggle={idx === 0 ? () => null : toggle} />
      ))}
    </motion.ul>
  );
};

export const MenuItem = ({
  el,
  toggle,
}: {
  el: React.ReactNode;
  toggle: () => void;
}) => {
  return (
    <motion.li
      variants={Itemvariants}
      whileTap={{ scale: 0.95 }}
      className="mb-5 flex max-w-max cursor-pointer list-none items-center"
      onClick={toggle}
    >
      {el}
    </motion.li>
  );
};
