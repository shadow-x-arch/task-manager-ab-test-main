"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import i18nConfig from "../../../../i18nextConfig";

export default function LanguageSwitch() {
  const { locale } = useParams();

  const router = useRouter();
  const path = usePathname();

  const [language, setLanguage] = useState(
    typeof locale === "object" ? locale[0] : locale
  );

  const localeIcons: Record<string, string> = {
    en: "https://imagedelivery.net/oie13id8YpvudjA6JEtRCw/d1d2b4cf-2707-4261-ed06-d094958fc000/public",
    fr: "https://imagedelivery.net/oie13id8YpvudjA6JEtRCw/e3012ccb-2b33-4fec-5fab-b7c3de82bb00/public",
  };

  const handleChange = (e: string) => {
    const newLocale = e;

    if (locale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push(path.replace(`${locale}`, `${newLocale}`));
    } else {
      router.push(path.replace(`${locale}`, `${newLocale}`));
    }
  };
  return (
    <Select onValueChange={(e) => handleChange(e)} value={language}>
      <SelectTrigger
        className="mx-auto flex h-full w-max max-w-max items-center gap-2 border-0 bg-transparent px-0 py-0 focus:border-none focus:outline-none focus:ring-transparent lg:h-10 lg:px-3 lg:py-2 lg:focus:ring-2 lg:focus:ring-primary"
        value={language}
      >
        <figure className="relative h-6 w-8 rounded-full">
          <Image
            src={(localeIcons[language] as string) ?? localeIcons["en"]}
            alt="Flag"
            className="rounded-full object-contain"
            fill
          />
        </figure>{" "}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="fr">FR</SelectItem>
        <SelectItem value="en">ENG</SelectItem>
      </SelectContent>
    </Select>
  );
}
