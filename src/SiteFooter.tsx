import type { CSSProperties } from "react";
import { Icon } from "./Icon";
import type { FooterConfig, FooterLink, FooterSlots } from "./types";

/**
 * Wspólna stopka marek *Ready (design GastroReady, motyw per marka).
 *
 * Kolory pochodzą wyłącznie ze zmiennych CSS ustawianych z `cfg.theme`, a
 * layout używa tylko uniwersalnych klas Tailwind + hover przez lokalny <style>.
 * Dzięki temu komponent nie wymaga konfiguracji skanowania Tailwind u konsumenta.
 */
export function SiteFooter({
  cfg,
  slots,
  year,
}: {
  cfg: FooterConfig;
  slots?: FooterSlots;
  /** Rok do copyrightu; domyślnie bieżący (podaj jawnie by uniknąć mismatchu SSR). */
  year?: number;
}) {
  const t = cfg.theme;
  const badge = cfg.brand.badge ?? cfg.brand.name.charAt(0).toUpperCase();
  const shownYear = year ?? new Date().getFullYear();

  const rootStyle = {
    "--rf-bg": t.bg,
    "--rf-accent": t.accent,
    "--rf-accent-contrast": t.accentContrast ?? "#fff",
    "--rf-border": t.border,
    "--rf-muted": t.muted,
    background: "var(--rf-bg)",
  } as CSSProperties;

  return (
    <>
      {slots?.newsletter}
      <footer
        id="footer"
        data-rf-footer
        className="text-white"
        style={rootStyle}
      >
        {/* Lokalne reguły hover — niezależne od Tailwind konsumenta. */}
        <style>{`
          [data-rf-footer] .rf-link{color:var(--rf-muted);transition:color .15s}
          [data-rf-footer] .rf-link:hover{color:#fff}
          [data-rf-footer] .rf-sister{color:var(--rf-muted);transition:color .15s}
          [data-rf-footer] .rf-sister:hover{color:var(--rf-accent)}
          [data-rf-footer] .rf-social:hover{background:rgba(255,255,255,.2)}
          [data-rf-footer] .rf-border{border-color:var(--rf-border)}
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <a
                href={cfg.brand.homeHref}
                className="flex items-center space-x-2"
              >
                <span
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black"
                  style={{
                    background: "var(--rf-accent)",
                    color: "var(--rf-accent-contrast)",
                  }}
                >
                  {badge}
                </span>
                <span className="text-2xl font-bold">{cfg.brand.name}</span>
              </a>
              <p
                className="text-sm max-w-xs"
                style={{ color: "var(--rf-muted)" }}
              >
                {cfg.tagline}
              </p>
            </div>

            {/* Kolumny nawigacji */}
            {cfg.columns.map((col, ci) => (
              <div key={ci}>
                <h2 className="font-bold mb-4 text-white">{col.title}</h2>
                <ul className="space-y-2 text-sm">
                  {col.links.map((l, li) => (
                    <li key={li}>
                      <FooterAnchor link={l} className="rf-link" />
                    </li>
                  ))}
                  {/* Slot cookie w ostatniej kolumnie, jeśli podano */}
                  {ci === cfg.columns.length - 1 && slots?.cookieSettings ? (
                    <li>{slots.cookieSettings}</li>
                  ) : null}
                </ul>

                {/* Belka social — pod kolumną wskazaną przez obecność social */}
                {ci === cfg.columns.length - 2 && cfg.social.length > 0 ? (
                  <div className="mt-5 flex items-center gap-2">
                    {cfg.social.map((s, si) => (
                      <a
                        key={si}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="rf-social inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 transition"
                      >
                        <Icon
                          name={s.platform}
                          className="w-4 h-4"
                          style={{ color: "rgba(255,255,255,.7)" }}
                        />
                      </a>
                    ))}
                    {cfg.crossPromo?.map((b, bi) => (
                      <a
                        key={`cp-${bi}`}
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={b.label}
                        title={b.title}
                        className="rf-social inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 transition"
                      >
                        <span
                          className="text-xs font-black leading-none"
                          style={{ color: "var(--rf-accent)" }}
                        >
                          {b.glyph}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Marki siostrzane */}
          {cfg.sisterBrands ? (
            <div className="rf-border border-t pt-4 pb-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs" style={{ color: "var(--rf-muted)" }}>
              {cfg.sisterBrands.prefix ? (
                <>
                  <span>{cfg.sisterBrands.prefix}</span>
                  <span aria-hidden>·</span>
                </>
              ) : null}
              {cfg.sisterBrands.links.map((l, i) => (
                <span key={i} className="flex items-center gap-x-2">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rf-sister"
                  >
                    {l.label}
                  </a>
                  {i < cfg.sisterBrands!.links.length - 1 ? (
                    <span aria-hidden>·</span>
                  ) : null}
                </span>
              ))}
            </div>
          ) : null}

          {/* Dół */}
          <div className="rf-border border-t pt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm" style={{ color: "var(--rf-muted)" }}>
              © {shownYear} {cfg.brand.name}. {cfg.copyright}
            </p>
            {cfg.disclaimer ? (
              <p className="text-xs" style={{ color: "var(--rf-muted)" }}>
                {cfg.disclaimer}
              </p>
            ) : null}
          </div>
          {cfg.legalDisclaimer ? (
            <p className="text-xs mt-4 text-center" style={{ color: "var(--rf-muted)" }}>
              {cfg.legalDisclaimer}
            </p>
          ) : null}
        </div>
      </footer>
    </>
  );
}

function FooterAnchor({ link, className }: { link: FooterLink; className?: string }) {
  const ext = link.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a href={link.href} className={className} {...ext}>
      {link.label}
    </a>
  );
}
