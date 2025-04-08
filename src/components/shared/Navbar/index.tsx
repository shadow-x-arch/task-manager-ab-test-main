"use client";

import React from "react";

import useWindowSize from "@/hooks/useWindowSize";
import SmallNavbar from "./Small";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageSwitch from "../LanguageSwitch";
import { useTheme } from "next-themes";
import ThemeSwitch from "../ThemeSwitch";

function Navbar() {
  const { width } = useWindowSize();

  if (width! <= 1023) {
    return <SmallNavbar />;
  }

  return (
    <nav className="fixed inset-0 top-0 z-30 ml-24 hidden h-20 items-center justify-between border-b border-gray-100 bg-white px-8 dark:border-gray-700 dark:bg-gray-900 lg:flex">
      <div className="relative">
        <input
          className="h-12 w-96 rounded-xl bg-gray-100 px-4 pr-12 text-sm outline-primary transition-all dark:bg-gray-800"
          placeholder="Search"
        />
        <Search
          className="absolute right-4 top-1/2 -translate-y-1/2"
          strokeWidth={1}
        />
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitch />
        <ThemeSwitch />
        <Button
          size="icon"
          variant="ghost"
          className="min-h-8 min-w-10 rounded-lg bg-gray-100 dark:bg-gray-800"
        >
          <Bell className="h-5 w-5" strokeWidth={1} />
        </Button>
        <Avatar className="size-14">
          <AvatarImage src="https://github.com/shadow-x-arch.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

export default Navbar;
