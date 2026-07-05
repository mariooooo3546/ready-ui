import type { ReactNode } from "react";

/** Pojedynczy link w kolumnie stopki. */
export interface FooterLink {
  label: string;
  href: string;
  /** true = otwiera w nowej karcie (target=_blank, rel=noopener). */
  external?: boolean;
}

/** Kolumna nawigacji w stopce. */
export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/** Ikona social w belce. `platform` musi istnieć w Icon.tsx. */
export interface SocialLink {
  platform: "facebook" | "youtube" | "linkedin" | "instagram";
  href: string;
  /** aria-label, np. "YouTube - GastroReady". */
  label: string;
}

/** Mały kwadratowy badge marki-siostry w belce social (np. "HR", "GR"). */
export interface CrossPromoBadge {
  /** Krótki tekst, np. "HR". */
  glyph: string;
  href: string;
  title: string;
  label: string;
}

/**
 * Motyw stopki — mapowany na zmienne CSS. Każda marka podaje swoje kolory,
 * układ pozostaje wspólny. Wartości to dowolny CSS color (hex, rgb, oklch...).
 */
export interface FooterTheme {
  /** Tło stopki. */
  bg: string;
  /** Kolor akcentu (badge marki, hover linków siostrzanych). */
  accent: string;
  /** Kolor tekstu akcentu na tle badge (kontrast do `accent`). */
  accentContrast?: string;
  /** Kolor obramowań-separatorów. */
  border: string;
  /** Kolor przygaszonego tekstu (linki, opisy). */
  muted: string;
}

/** Pełna konfiguracja stopki dla jednej marki. */
export interface FooterConfig {
  brand: {
    name: string;
    /** Dokąd prowadzi logo/nazwa. */
    homeHref: string;
    /** Litera w kwadratowym badge logo (np. "G", "H"). Domyślnie 1. litera nazwy. */
    badge?: string;
  };
  theme: FooterTheme;
  tagline: string;
  columns: FooterColumn[];
  social: SocialLink[];
  /** Badge marek-sióstr w belce social. */
  crossPromo?: CrossPromoBadge[];
  /** Pasek marek-sióstr pod kolumnami. */
  sisterBrands?: {
    prefix?: string;
    links: FooterLink[];
  };
  /** © ... (bez roku — rok dokleja komponent). */
  copyright: string;
  /** Opcjonalne linie disclaimera na dole. */
  disclaimer?: string;
  legalDisclaimer?: string;
}

/** Sloty na komponenty specyficzne dla aplikacji (mają własne zależności). */
export interface FooterSlots {
  /** Sekcja newslettera renderowana NAD stopką (np. <NewsletterSection/>). */
  newsletter?: ReactNode;
  /** Link "Ustawienia cookies" wstawiany w kolumnie prawnej. */
  cookieSettings?: ReactNode;
}
