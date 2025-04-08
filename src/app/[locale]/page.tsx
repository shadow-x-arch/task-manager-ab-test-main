import initTranslations from "../i18n";

import TranslationsProvider from "@/components/TranslationsProvider";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import Card from "@/components/shared/Card";
import AccessSection from "@/components/Tasks/AccessSection";
import TabsSection from "@/components/Tasks/TabsSection";

const i18nNamespaces = ["task"];

export interface FcProps {
  params: { locale: string };
}

export default async function Tasks({ params: { locale } }: FcProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <main className="my-4 flex flex-col gap-8  pl-4 pr-8">
        {/* header */}
        <div className="flex flex-col items-center justify-between sm:flex-row">
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
          <p className="inline-flex flex-col gap-2 text-right text-sm">
            <span className="inline-block font-semibold">From 1 April</span>
            <span className="relative inline-block text-gray-500 before:absolute before:-left-4 before:top-1/2 before:inline-block before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green-500 before:content-['']">
              Updated 30 min ago
            </span>
          </p>
        </div>
        <AccessSection />
        <TabsSection />

        {/* Card grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* {[...new Array(30)].map((_, idx) => (
            <Card key={idx} index={idx} />
          ))} */}
        </div>
      </main>
    </TranslationsProvider>
  );
}
