"use client";

import React from "react";

import useWindowSize from "@/hooks/useWindowSize";

import {
  Bell,
  FileBarChart,
  FolderOpen,
  Home,
  Mail,
  Moon,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Logo from "../../../assets/todo.png";
import NavLink from "../Navbar/Menu/NavLink";
import Link from "next/link";

const Links = [
  {
    link: "#",
    icon: <Home className="size-6" strokeWidth={1} />,
  },
  {
    link: "/#",
    icon: <Mail className="size-6" strokeWidth={1} />,
  },
  {
    link: "/#",
    icon: <FileBarChart className="size-6" strokeWidth={1} />,
  },
  {
    link: "/#",
    icon: <FolderOpen className="size-6" strokeWidth={1} />,
  },
];

function Sidebar() {
  return (
    <div className="fixed inset-0 left-0 top-0 z-30 hidden h-screen w-24 flex-col items-center justify-between border-r border-gray-100 bg-white pb-8 pt-4 dark:border-gray-700 dark:bg-gray-900 lg:flex">
      <div className="flex w-full flex-col items-center gap-12 border-b border-inherit pb-8">
        <div className="relative size-12">
          <Image
            className="rounded-full object-cover"
            alt="Logo"
            src={Logo}
            placeholder="blur"
            fill
          />
        </div>
        <div className="flex w-full flex-col gap-4">
          {Links.map((_, idx) => (
            <NavLink
              href={_.link}
              classNames="w-full flex items-center justify-center py-2"
              key={idx}
            >
              {_.icon}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {[...new Array(2)].map((_, idx) => (
          <Avatar className="size-8 object-cover" key={idx}>
            <AvatarImage
              src={
                idx % 2 === 0
                  ? "https://github.com/shadow-x-arch.png"
                  : "https://images.pexels.com/photos/2880529/pexels-photo-2880529.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))}
        <Button
          size="icon"
          className="flex min-h-8 min-w-10 items-center justify-center rounded-full border border-dashed border-gray-300 bg-transparent dark:border-gray-700"
        >
          <Plus className="size-4" strokeWidth={1} />
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <Link href="#">
          <Settings className="size-6" strokeWidth={1} />
        </Link>

        <Link href="#">
          <User className="size-6" strokeWidth={1} />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
