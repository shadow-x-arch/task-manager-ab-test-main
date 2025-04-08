"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { motion } from "framer-motion";

import { useParams, usePathname } from "next/navigation";
import { montserrat } from "@/app/fonts";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  classNames?: string;
}
export default function NavLink(props: NavLinkProps) {
  const { href, children, classNames, ...rest } = props;
  const path = usePathname();
  const { locale } = useParams();

  const active =
    path.includes(`/${locale}${href}/`) ||
    path === `/${locale}${href}` ||
    (!path.includes(locale as string) && path === href) ||
    (href === "/" && locale.length + 1 === path.length);

  return (
    <Link
      prefetch
      className={cn(
        "relative flex h-full w-full items-center text-center text-sm transition-all duration-100 ease-out",
        {
          "relative font-bold text-primary": active,
          "text-grey-base border-transparent font-medium hover:text-primary":
            !active,
        },
        classNames,
        montserrat.className
      )}
      href={href}
      {...rest}
    >
      {active && (
        <motion.span
          layoutId="active"
          className="absolute left-0 top-0 hidden h-full w-1.5 rounded-r-lg bg-primary lg:inline-block"
        />
      )}
      {children}
    </Link>
  );
}
