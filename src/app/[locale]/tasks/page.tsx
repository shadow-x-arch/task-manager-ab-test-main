import initTranslations from "../../i18n";

import TranslationsProvider from "@/components/TranslationsProvider";
import { FcProps } from "../page";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import AccessSection from "@/components/Tasks/AccessSection";
import TabsSection from "@/components/Tasks/TabsSection";
import Card from "@/components/shared/Card/CardDummy";
import CardList from "@/components/shared/CardList";

const i18nNamespaces = ["task"];

export default async function Tasks({ params: { locale } }: FcProps) {
  const { resources, t } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <main className="my-4 flex flex-col gap-8  px-4">
        {/* header */}
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">design</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Website design</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1>Website Design</h1>
          </div>
          <p className="inline-flex max-w-max flex-col gap-2 text-sm sm:text-right">
            <span className="inline-block font-semibold">
              {" "}
              {t("task:dates")}
            </span>
            <span className="relative inline-block text-gray-500 before:-left-4 before:top-1/2 before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green-500 before:content-[''] sm:before:absolute sm:before:inline-block">
              {t("task:updates")}
            </span>
          </p>
        </div>
        <AccessSection />
        <TabsSection />

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <CardList />

          {/* {[...new Array(30)].map((_, idx) => (
            <Card key={idx} index={idx} />
          ))} */}
        </div>
      </main>
    </TranslationsProvider>
  );
}
