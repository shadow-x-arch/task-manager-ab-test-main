import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nextConfig";

export function middleware(request) {
  return i18nRouter(request, { ...i18nConfig, localeDetector: false });
}

export const config = { matcher: "/((?!api|static|.*\\..*|_next).*)" };
