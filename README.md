# @ready/ui

Współdzielone komponenty UI marek **\*Ready** (GastroReady, HostReady, NailsReady, FizjoReady, BarberReady).
Jedno źródło prawdy dla **stopki** i **belki social** — design GastroReady, motyw (kolory) per marka.

## Zawartość

- `SiteFooter` — parametryzowana stopka (layout Gastro, kolory ze zmiennych CSS).
- `Icon` — ikony social (facebook, youtube, linkedin, instagram).
- Typy: `FooterConfig`, `FooterTheme`, `FooterColumn`, `FooterLink`, `SocialLink`, `CrossPromoBadge`, `FooterSlots`.

Komponent używa **wyłącznie uniwersalnych klas Tailwind** (layout) + **zmiennych CSS** (kolory),
więc **nie wymaga** konfiguracji skanowania Tailwind (`@source`) w aplikacji konsumującej.

## Instalacja (git-dependency)

W `package.json` serwisu:

```jsonc
"dependencies": {
  "@ready/ui": "github:<org>/ready-ui#v0.1.0"   // produkcja: tag git
  // lokalny development / spike:
  // "@ready/ui": "file:../ready-ui"
}
```

W `next.config.ts` serwisu dodaj transpilację (pakiet dostarcza surowe `.tsx`):

```ts
const nextConfig: NextConfig = {
  transpilePackages: ["@ready/ui"],
  // ...reszta configu
};
```

Następnie `npm install`.

## Użycie

```tsx
"use client";
import { SiteFooter, type FooterConfig } from "@ready/ui";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { useTranslations } from "@/lib/i18n";

export function Footer() {
  const t = useTranslations();
  const cfg: FooterConfig = {
    brand: { name: "HostReady", homeHref: t.basePath || "/", badge: "H" },
    theme: {
      bg: "#134e4a",        // teal-800
      accent: "#f59e0b",    // amber-500
      accentContrast: "#134e4a",
      border: "rgba(255,255,255,.1)",
      muted: "rgba(255,255,255,.6)",
    },
    tagline: t.footer.tagline,
    columns: [ /* { title, links: [{label, href, external?}] } */ ],
    social: [
      { platform: "facebook", href: "...", label: "HostReady on Facebook" },
      { platform: "youtube",  href: "#",   label: "HostReady on YouTube" },
      { platform: "linkedin", href: "...", label: "HostReady on LinkedIn" },
    ],
    crossPromo: [{ glyph: "GR", href: "https://gastroready.pl", title: "GastroReady", label: "GastroReady" }],
    sisterBrands: { prefix: "Projekt 100M Sp. z o.o.", links: [ /* ... */ ] },
    copyright: t.footer.copyright,
  };

  return (
    <SiteFooter
      cfg={cfg}
      slots={{ newsletter: <NewsletterSection />, cookieSettings: <CookieSettingsLink /> }}
      year={2026}
    />
  );
}
```

**Motyw:** `theme.bg/accent/border/muted` to dowolny CSS color. Layout jest wspólny;
żeby marka wyglądała 1:1 jak Gastro (zielono), podaj kolory Gastro. Żeby zachować
tożsamość marki — podaj jej własne (host=teal, nails=pink).

## Publikacja nowej wersji

1. Zmiana w `src/`, commit.
2. `git tag v0.2.0 && git push --tags` (w repo `ready-ui`).
3. W serwisach bump `#v0.1.0` → `#v0.2.0` w `package.json` i `npm install`.

Kolejność rollout: hostready → nailsready → fizjoready → Barber (Gastro jest wzorcem).
