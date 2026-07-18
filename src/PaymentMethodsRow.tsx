import { useId, type ReactElement } from "react";

/**
 * Znaki graficzne metod płatności - inline SVG (self-contained, bez zależności
 * od plików w /public konsumenta - ten sam powód co przy SiteFooter/Icon).
 * BLIK ma gradienty z id w <defs>; useId() nadaje unikalny prefiks, żeby
 * dwie kopie komponentu na tej samej stronie (np. duplikat mobile/desktop)
 * nie kolidowały ze sobą (SVG id musi być unikalne w całym dokumencie).
 */
function BlikMark({ className }: { className?: string }) {
  const uid = useId();
  const gradBg = `blik-bg-${uid}`;
  const gradDot = `blik-dot-${uid}`;
  const clip = `blik-clip-${uid}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 151 150" className={className} role="img" aria-label="BLIK">
      <g clipPath={`url(#${clip})`}>
        <path fill="#fff" d="M.5 0h150v150H.5z" />
        <path fill={`url(#${gradBg})`} d="M0 0h150.5v150.5H0z" transform="translate(.5 -.5)" />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M61.64 30.07H47.532v61.14c0 16.884 13.687 30.571 30.57 30.571 16.884 0 30.571-13.687 30.571-30.57 0-16.884-13.687-30.57-30.57-30.57a30.425 30.425 0 0 0-16.461 4.805V30.07Zm30.57 61.14c0 7.793-6.316 14.11-14.108 14.11-7.793 0-14.11-6.317-14.11-14.11 0-7.791 6.317-14.108 14.11-14.108 7.792 0 14.109 6.316 14.109 14.109Z"
          clipRule="evenodd"
        />
        <rect width="28.219" height="28.219" x="78.102" y="55.938" fill={`url(#${gradDot})`} rx="14.109" transform="rotate(-90 78.102 55.938)" />
      </g>
      <defs>
        <linearGradient id={gradBg} x1="75.25" x2="75.25" y1="149.447" y2=".602" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5A5A5A" />
          <stop offset=".146" stopColor="#484848" />
          <stop offset=".52" stopColor="#212121" />
          <stop offset=".817" stopColor="#080808" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient id={gradDot} x1="82.25" x2="102.2" y1="60.057" y2="80.036" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E52F08" />
          <stop offset="1" stopColor="#E94F96" />
        </linearGradient>
        <clipPath id={clip}>
          <path fill="#fff" d="M.5 0h150v150H.5z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function VisaMark({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 500" className={className} role="img" aria-label="Visa">
      <rect width="780" height="500" rx="40" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
      <path
        d="M293.2 348.7l33.4-195.8h53.4l-33.4 195.8zM540.7 157.5c-10.6-4-27.2-8.3-47.9-8.3-52.8 0-90 26.6-90.2 64.6-.3 28.1 26.5 43.8 46.8 53.2 20.8 9.6 27.8 15.7 27.7 24.3-.1 13.1-16.6 19.1-32 19.1-21.4 0-32.7-3-50.3-10.2l-6.9-3.1-7.5 43.8c12.5 5.5 35.6 10.2 59.6 10.5 56.2 0 92.6-26.3 93-66.8.2-22.3-14-39.2-44.8-53.2-18.7-9.1-30.1-15.1-30-24.3 0-8.1 9.7-16.8 30.6-16.8 17.5-.3 30.1 3.5 40 7.5l4.8 2.3 7.3-42.7z"
        fill="#1434CB"
      />
      <path
        d="M634.1 152.9h-41.3c-12.8 0-22.4 3.5-28 16.3l-79.3 179.5h56.1s9.2-24.1 11.2-29.4c6.1 0 60.6.1 68.4.1 1.6 6.9 6.5 29.3 6.5 29.3h49.6l-43.2-195.8zm-65.9 126.3c4.4-11.3 21.3-54.7 21.3-54.7-.3.5 4.4-11.3 7.1-18.7l3.6 16.9s10.2 46.8 12.4 56.5h-44.4z"
        fill="#1434CB"
      />
      <path d="M247.8 152.9l-52.4 133.5-5.6-27.1c-9.7-31.2-39.9-65-73.7-81.9l47.9 171.2h56.5l84-195.7h-56.7z" fill="#1434CB" />
      <path d="M146.9 152.9H59.6l-.7 3.5c67 16.2 111.4 55.3 129.7 102.3l-18.7-90c-3.2-12.4-12.8-15.4-23-15.8z" fill="#F9A533" />
    </svg>
  );
}

function MastercardMark({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 500" className={className} role="img" aria-label="Mastercard">
      <rect width="780" height="500" rx="40" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
      <circle cx="330" cy="250" r="150" fill="#EB001B" />
      <circle cx="450" cy="250" r="150" fill="#F79E1B" />
      <path d="M390 130.7c-38.2 30-62.7 76.7-62.7 129.3s24.5 99.3 62.7 129.3c38.2-30 62.7-76.7 62.7-129.3s-24.5-99.3-62.7-129.3z" fill="#FF5F00" />
    </svg>
  );
}

function PayUMark({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 36" className={className} role="img" aria-label="PayU">
      <text x="2" y="27" fontFamily="Verdana,Arial,sans-serif" fontSize="25" fontWeight="700" fill="#4d4d4d">Pay</text>
      <rect x="59" y="6" width="27" height="26" rx="4" fill="#83b81a" />
      <text x="63.5" y="27" fontFamily="Verdana,Arial,sans-serif" fontSize="25" fontWeight="700" fill="#ffffff">U</text>
    </svg>
  );
}

function StripeMark({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 500" className={className} role="img" aria-label="Stripe">
      <rect width="780" height="500" rx="40" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
      <text
        x="390"
        y="335"
        textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        fontWeight="700"
        fontSize="220"
        fill="#635BFF"
        letterSpacing="-8"
      >
        stripe
      </text>
    </svg>
  );
}

/** Klucze bramek/metod obsługiwane przez PaymentMethodsRow. */
export type PaymentMethodKey = "blik" | "visa" | "mastercard" | "payu" | "stripe";

const MARKS: Record<PaymentMethodKey, (props: { className?: string }) => ReactElement> = {
  blik: BlikMark,
  visa: VisaMark,
  mastercard: MastercardMark,
  payu: PayUMark,
  stripe: StripeMark,
};

export interface PaymentMethodsRowProps {
  /**
   * Które metody pokazać - TYLKO realnie aktywne bramki danej marki (nie
   * "na zapas"/"w przyszłości"). Kolejność w tablicy = kolejność wyświetlania.
   */
  methods: PaymentMethodKey[];
  className?: string;
}

/** Rząd logotypów płatności, wyświetlany pod CTA/przyciskiem zamówienia. */
export function PaymentMethodsRow({ methods, className }: PaymentMethodsRowProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3${className ? ` ${className}` : ""}`}
      aria-label="Akceptowane metody płatności"
    >
      {methods.map((key) => {
        const Mark = MARKS[key];
        if (!Mark) return null;
        return <Mark key={key} className="h-7 w-auto opacity-70 hover:opacity-100 transition" />;
      })}
    </div>
  );
}
