import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";
import { PaymentMethodsRow, type PaymentMethodKey } from "./PaymentMethodsRow";

/**
 * Motyw karty podsumowania checkoutu. Wartości to gotowe CSS color (hex,
 * rgb, lub `var(--...)` odwołanie do zmiennej marki konsumenta) - komponent
 * nie zna nazw tokenów Tailwinda konsumenta (te bywają inne, np. hostready
 * uzywa teal/slate zamiast primary/accent), więc caller podaje literały.
 */
export interface CheckoutSummaryTheme {
  /** Główny kolor treści (odpowiednik Tailwind primary-700). */
  text: string;
  /** Przygaszony/etykietowy kolor tekstu (primary-600). */
  textMuted: string;
  /** Kolor obramowań/linii (primary-100). */
  border: string;
  /** Tło "trust box" pod kartą (primary-50). */
  tintBg: string;
  /** Kolor akcentu marki - ikona błyskawicy + drugi trust-badge (accent-500/600). */
  accent: string;
  /** Jasne tło pod ikoną akcentu (accent-100). */
  accentTint: string;
}

export interface CheckoutOrderSummaryProps {
  theme: CheckoutSummaryTheme;
  /** Treść renderowana NAD sekcją "co dostajesz" (nazwa pakietu, cena, rabat) - w pełni lokalna logika. */
  children?: ReactNode;
  /** Nagłówek listy (np. "CO DOSTAJESZ"). */
  whatsIncludedLabel: string;
  /** Bullet listy - lokalna zawartość pakietu (dokumenty/funkcje). */
  items: string[];
  /** Wiersz z ikoną błyskawicy - obietnica dostawy. */
  instantDeliveryText: string;
  /** Wiersz z ikoną kłódki - bezpieczna płatność. */
  securePaymentText: string;
  /**
   * Wolny tekst "trust line" pod kartą - per marka: liczba klientów,
   * gwarancja, zgodność prawna itp. NIE wymuszać jednego formatu.
   */
  trustLineText: string;
  /**
   * Notka o dostępie/braku umów/karty. Zalecenie: zawsze 3 elementy
   * (dostęp od razu, bez umów, bez podpinania karty) - patrz audyt 2026-07-18.
   */
  accessNoteText: string;
  /** Etykieta nad logotypami płatności. */
  securePaymentsLabel: string;
  paymentMethods: PaymentMethodKey[];
  className?: string;
}

/** Karta podsumowania zamówienia (sidebar desktop) - jedno źródło prawdy dla portfolio *Ready. */
export function CheckoutOrderSummary({
  theme,
  children,
  whatsIncludedLabel,
  items,
  instantDeliveryText,
  securePaymentText,
  trustLineText,
  accessNoteText,
  securePaymentsLabel,
  paymentMethods,
  className,
}: CheckoutOrderSummaryProps) {
  const rootStyle = {
    "--cs-text": theme.text,
    "--cs-text-muted": theme.textMuted,
    "--cs-border": theme.border,
    "--cs-tint-bg": theme.tintBg,
    "--cs-accent": theme.accent,
    "--cs-accent-tint": theme.accentTint,
  } as CSSProperties;

  return (
    <div data-rf-checkout-summary style={rootStyle} className={className}>
      <style>{`
        [data-rf-checkout-summary] .rf-card{background:#fff;border-radius:1.5rem;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);border:1px solid var(--cs-border);padding:1.25rem}
        [data-rf-checkout-summary] .rf-hr{border-color:var(--cs-border);margin-top:.75rem;margin-bottom:.75rem}
        [data-rf-checkout-summary] .rf-label{font-size:.75rem;line-height:1rem;font-weight:700;color:var(--cs-text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem}
        [data-rf-checkout-summary] .rf-list{display:flex;flex-direction:column;gap:.375rem}
        [data-rf-checkout-summary] .rf-list-item{display:flex;align-items:flex-start;gap:.5rem;font-size:.875rem;line-height:1.25rem;color:var(--cs-text)}
        [data-rf-checkout-summary] .rf-list-item svg{margin-top:.125rem;flex-shrink:0;color:#22c55e}
        [data-rf-checkout-summary] .rf-benefits{display:flex;flex-direction:column;gap:.375rem;font-size:.875rem;line-height:1.25rem;color:var(--cs-text-muted)}
        [data-rf-checkout-summary] .rf-benefit-row{display:flex;align-items:center;gap:.5rem}
        [data-rf-checkout-summary] .rf-benefit-row svg{flex-shrink:0}
        [data-rf-checkout-summary] .rf-benefit-accent svg{color:var(--cs-accent)}
        [data-rf-checkout-summary] .rf-benefit-success svg{color:#22c55e}
        [data-rf-checkout-summary] .rf-trustbox{background:var(--cs-tint-bg);border-radius:1rem;padding:1rem;margin-top:1rem;display:flex;flex-direction:column;gap:.75rem}
        [data-rf-checkout-summary] .rf-trust-row{display:flex;align-items:center;gap:.75rem;font-size:.875rem;line-height:1.25rem;color:var(--cs-text)}
        [data-rf-checkout-summary] .rf-trust-badge{width:2rem;height:2rem;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        [data-rf-checkout-summary] .rf-trust-badge-success{background:#dcfce7}
        [data-rf-checkout-summary] .rf-trust-badge-success svg{color:#16a34a}
        [data-rf-checkout-summary] .rf-trust-badge-accent{background:var(--cs-accent-tint)}
        [data-rf-checkout-summary] .rf-trust-badge-accent svg{color:var(--cs-accent)}
        [data-rf-checkout-summary] .rf-payments{display:flex;flex-direction:column;align-items:center;gap:.5rem;margin-top:1rem}
        [data-rf-checkout-summary] .rf-payments-label{font-size:.75rem;line-height:1rem;color:var(--cs-text-muted);text-transform:uppercase;letter-spacing:.05em}
      `}</style>

      <div className="rf-card">
        {children}

        <hr className="rf-hr" />

        <p className="rf-label">{whatsIncludedLabel}</p>
        <ul className="rf-list">
          {items.map((item, i) => (
            <li key={i} className="rf-list-item">
              <Icon name="circle-check" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <hr className="rf-hr" />

        <div className="rf-benefits">
          <div className="rf-benefit-row rf-benefit-accent">
            <Icon name="bolt" />
            <span>{instantDeliveryText}</span>
          </div>
          <div className="rf-benefit-row rf-benefit-success">
            <Icon name="lock" />
            <span>{securePaymentText}</span>
          </div>
        </div>
      </div>

      <div className="rf-trustbox">
        <div className="rf-trust-row">
          <span className="rf-trust-badge rf-trust-badge-success">
            <Icon name="circle-check" />
          </span>
          <span>{trustLineText}</span>
        </div>
        <div className="rf-trust-row">
          <span className="rf-trust-badge rf-trust-badge-accent">
            <Icon name="file-lines" />
          </span>
          <span>{accessNoteText}</span>
        </div>
      </div>

      <div className="rf-payments">
        <p className="rf-payments-label">{securePaymentsLabel}</p>
        <PaymentMethodsRow methods={paymentMethods} />
      </div>
    </div>
  );
}
