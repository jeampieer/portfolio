export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;
export const isLocale = (value: string): value is Locale =>
    locales.some((locale) => locale === value);
