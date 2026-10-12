import { createContext, useContext } from "react";
import { translate, type Locale } from "./lib/i18n";

export const LocaleContext = createContext<Locale>("zh");

export function useTranslations() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: (key: string, values?: Record<string, string | number>) => translate(locale, key, values),
  };
}
