import type { CSSProperties } from "react";
import { Icon } from "./Icon";

export interface CheckoutMobileTrustBarProps {
  /** Kolor obramowań/linii (primary-100 - używany tylko jeśli theme.border podane, inaczej brak obramowania). */
  theme: { text: string; tintBg: string };
  trustLineText: string;
  securePaymentText: string;
  /** Podpis pod spodem (np. dane firmy) - opcjonalny. */
  captionText?: string;
  className?: string;
}

/** Skrócony wariant CheckoutOrderSummary na mobile - box pod formularzem zamiast sidebaru. */
export function CheckoutMobileTrustBar({
  theme,
  trustLineText,
  securePaymentText,
  captionText,
  className,
}: CheckoutMobileTrustBarProps) {
  const rootStyle = {
    "--cmb-text": theme.text,
    "--cmb-tint-bg": theme.tintBg,
    background: "var(--cmb-tint-bg)",
  } as CSSProperties;

  return (
    <div data-rf-checkout-mobile-trust style={rootStyle} className={className}>
      <style>{`
        [data-rf-checkout-mobile-trust]{border-radius:1rem;padding:1.25rem;display:flex;flex-direction:column;gap:.75rem}
        [data-rf-checkout-mobile-trust] .rf-row{display:flex;align-items:center;gap:.5rem;font-size:.875rem;line-height:1.25rem;color:var(--cmb-text)}
        [data-rf-checkout-mobile-trust] .rf-row svg{color:#22c55e;flex-shrink:0}
        [data-rf-checkout-mobile-trust] .rf-caption{font-size:.75rem;line-height:1rem;color:var(--cmb-text);text-align:center;padding-top:.5rem;opacity:.7}
      `}</style>
      <div className="rf-row">
        <Icon name="circle-check" />
        <span>{trustLineText}</span>
      </div>
      <div className="rf-row">
        <Icon name="lock" />
        <span>{securePaymentText}</span>
      </div>
      {captionText ? <p className="rf-caption">{captionText}</p> : null}
    </div>
  );
}
