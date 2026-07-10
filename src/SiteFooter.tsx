import type { CSSProperties } from "react";
import { Icon } from "./Icon";
import type { FooterConfig, FooterLink, FooterSlots } from "./types";

/**
 * Wspólna stopka marek *Ready (design GastroReady, motyw per marka).
 *
 * Kolory pochodzą wyłącznie ze zmiennych CSS ustawianych z `cfg.theme`.
 * Layout: klasy wyglądają jak Tailwind, ale WSZYSTKIE reguły są zdefiniowane
 * w lokalnym <style> scope'owanym do [data-rf-footer] — Tailwind konsumenta
 * NIE generuje klas, których konsument sam nie używa (np. md:grid-cols-5),
 * co przed v0.2.1 rozsypywało stopkę do jednej kolumny (gpsr, host).
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
        {/* Pelny CSS stopki — scope [data-rf-footer], zero zaleznosci od Tailwinda konsumenta. */}
        <style>{`
          [data-rf-footer] .rf-link{color:var(--rf-muted);transition:color .15s}
          [data-rf-footer] .rf-link:hover{color:#fff}
          [data-rf-footer] .rf-sister{color:var(--rf-muted);transition:color .15s}
          [data-rf-footer] .rf-sister:hover{color:var(--rf-accent)}
          [data-rf-footer] .rf-social:hover{background:rgba(255,255,255,.2)}
          [data-rf-footer] .rf-border{border-color:var(--rf-border)}
          [data-rf-footer]{color:#fff}
          [data-rf-footer] .max-w-7xl{max-width:80rem}
          [data-rf-footer] .mx-auto{margin-left:auto;margin-right:auto}
          [data-rf-footer] .px-4{padding-left:1rem;padding-right:1rem}
          [data-rf-footer] .py-12{padding-top:3rem;padding-bottom:3rem}
          [data-rf-footer] .grid{display:grid}
          [data-rf-footer] .gap-8{gap:2rem}
          [data-rf-footer] .mb-4{margin-bottom:1rem}
          [data-rf-footer] .mb-8{margin-bottom:2rem}
          [data-rf-footer] .mt-4{margin-top:1rem}
          [data-rf-footer] .mt-5{margin-top:1.25rem}
          [data-rf-footer] .pt-4{padding-top:1rem}
          [data-rf-footer] .pb-4{padding-bottom:1rem}
          [data-rf-footer] .pt-8{padding-top:2rem}
          [data-rf-footer] .flex{display:flex}
          [data-rf-footer] .inline-flex{display:inline-flex}
          [data-rf-footer] .flex-col{flex-direction:column}
          [data-rf-footer] .flex-wrap{flex-wrap:wrap}
          [data-rf-footer] .items-center{align-items:center}
          [data-rf-footer] .justify-center{justify-content:center}
          [data-rf-footer] .gap-2{gap:.5rem}
          [data-rf-footer] .gap-x-2{column-gap:.5rem}
          [data-rf-footer] .gap-y-1{row-gap:.25rem}
          [data-rf-footer] .space-x-2>*+*{margin-left:.5rem}
          [data-rf-footer] .space-y-2>*+*{margin-top:.5rem}
          [data-rf-footer] .space-y-4>*+*{margin-top:1rem}
          [data-rf-footer] .w-4{width:1rem}
          [data-rf-footer] .h-4{height:1rem}
          [data-rf-footer] .w-8{width:2rem}
          [data-rf-footer] .h-8{height:2rem}
          [data-rf-footer] .w-10{width:2.5rem}
          [data-rf-footer] .h-10{height:2.5rem}
          [data-rf-footer] .rounded-lg{border-radius:.5rem}
          [data-rf-footer] .rounded-2xl{border-radius:1rem}
          [data-rf-footer] .border-t{border-top-width:1px;border-top-style:solid}
          [data-rf-footer] .bg-white\\/10{background-color:rgba(255,255,255,.1)}
          [data-rf-footer] .text-white{color:#fff}
          [data-rf-footer] .text-center{text-align:center}
          [data-rf-footer] .text-xs{font-size:.75rem;line-height:1rem}
          [data-rf-footer] .text-sm{font-size:.875rem;line-height:1.25rem}
          [data-rf-footer] .text-lg{font-size:1.125rem;line-height:1.75rem}
          [data-rf-footer] .text-2xl{font-size:1.5rem;line-height:2rem}
          [data-rf-footer] .font-bold{font-weight:700}
          [data-rf-footer] .font-black{font-weight:900}
          [data-rf-footer] .leading-none{line-height:1}
          [data-rf-footer] .max-w-xs{max-width:20rem}
          [data-rf-footer] .transition{transition:all .15s}
          @media(min-width:640px){
            [data-rf-footer] .sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}
            [data-rf-footer] .sm\\:flex-row{flex-direction:row}
            [data-rf-footer] .sm\\:items-center{align-items:center}
            [data-rf-footer] .sm\\:justify-between{justify-content:space-between}
          }
          @media(min-width:768px){
            [data-rf-footer] .md\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}
          }
          @media(min-width:1024px){
            [data-rf-footer] .lg\\:px-8{padding-left:2rem;padding-right:2rem}
          }
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
