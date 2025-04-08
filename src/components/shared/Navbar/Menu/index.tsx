"use client";

import React from "react";
import { motion } from "framer-motion";
import NavLink from "./NavLink";
import { useTranslation } from "react-i18next";

function Menu() {
  const { t } = useTranslation();

  return (
    <motion.div
      layout
      className="col-span-2 flex h-full items-center justify-center gap-16"
    >
      <NavLink href="/">{t("task:home")}</NavLink>
      <NavLink href="/about">{t("task:about")}</NavLink>
      <NavLink href="/benefits">{t("task:benefits")}</NavLink>
    </motion.div>
  );
}

export default Menu;
