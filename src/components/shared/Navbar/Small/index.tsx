"use client";
import Image from "next/image";
import Link from "next/link";
import { MenuToggle } from "./MenuToggle";
import { motion } from "framer-motion";
import { Navigation } from "./Navigation";
import useSmallNav from "./useSmallNav";
import Logo from "@/assets/todo.png";
import LanguageSwitch from "../../LanguageSwitch";
import ThemeSwitch from "../../ThemeSwitch";

export default function SmallNavbar() {
  const { isOpen, containerRef, toggleOpen, height, width, sidebar } =
    useSmallNav();

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="z-50 flex h-[72px] w-full items-center justify-between overflow-x-hidden border-b border-gray-100 px-4  text-white dark:border-gray-700"
    >
      <Link
        className="relative z-20 col-span-1 inline-flex size-10 max-w-10 place-items-center gap-2 lg:pointer-events-auto lg:p-0"
        href="/"
      >
        <Image
          src={Logo}
          alt="Logo"
          fill
          priority
          className="size-10 rounded-full object-cover object-center"
        />
      </Link>
      <motion.div
        className={
          "fixed bottom-0 right-0 top-0 -scale-x-100 bg-gray-900 dark:bg-gray-900"
        }
        variants={sidebar}
        style={{ width, position: isOpen ? "fixed" : "absolute" }}
      />
      <Navigation toggle={() => toggleOpen()} isOpen={isOpen} />
      <ThemeSwitch className="absolute right-12 rounded-full bg-gray-100 text-black dark:bg-gray-800 dark:text-white" />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
}
