import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import { twMerge } from "tailwind-merge";
import { montserrat } from "../fonts";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "../i18n";
// import ReactQueryProvider from "@/providers/ReactQueryProvider";//
import Sidebar from "@/components/shared/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Providers from "../../providers/providers";
import ToastProvider from "@/components/shared/Toast";

export const metadata: Metadata = {
  title: "Todo",
  description: `This is just another good looking todo App`,
};

const i18nNamespaces = ["task"];

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang="en">
      <body
        className={twMerge(
          montserrat.className,
          "overflow-x-hidden bg-highlight-blue dark:bg-gray-900"
        )}
      >
        <TranslationsProvider
          locale={locale}
          resources={resources}
          namespaces={i18nNamespaces}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-w-screen flex h-full min-h-screen flex-col lg:pl-28  lg:pt-24">
              <Sidebar />
              <Navbar />
              <ToastProvider>{children}</ToastProvider>
              {/* </Providers> */}
            </div>
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
