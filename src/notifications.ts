/**
 * Współdzielone powiadomienia (Telegram) dla marek *Ready.
 *
 * SERVER-ONLY. Moduł tworzy własnego klienta Supabase (service_role) z env
 * i czyta token bota + chat_id z tabeli `notification_config` we wspólnej
 * bazie (migracja _shared-db/013). Jedno źródło dla wszystkich serwisów —
 * rotacja tokenu = 1 UPDATE, bez redeployu.
 *
 * Samowystarczalny: NIE importuje niczego lokalnego z serwisu (żadnego
 * `@/lib/...`). Tenant + prefiks marki serwis podaje jako argument. Dzięki
 * temu ten sam kod działa w każdym repo bez zmian.
 *
 * Wymaga env (mają je wszystkie serwisy): NEXT_PUBLIC_SUPABASE_URL,
 * SUPABASE_SERVICE_ROLE_KEY. Fallback do TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID
 * gdy baza niedostępna / wiersz pusty (lokalny dev + siatka bezpieczeństwa).
 *
 * NIE importować z kodu klienckiego — czyta SUPABASE_SERVICE_ROLE_KEY.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface ResolvedTelegramConfig {
  token: string | null;
  chatIds: string[];
  enabled: boolean;
}

export interface SendOptions {
  /** Tenant serwisu (np. siteConfig.id) — do ewentualnego wiersza per-tenant. */
  tenant: string;
  /** Prefiks marki doklejany do treści, np. "[HostReady]". Pomiń, jeśli caller już prefiksuje. */
  prefix?: string;
}

const GLOBAL_KEY = "__global__";
const CACHE_TTL_MS = 60_000; // 60 s — token rotuje się rzadko

interface ConfigRow {
  tenant: string;
  bot_token: string | null;
  chat_id: string | null;
  enabled: boolean;
}

let _sb: SupabaseClient | null = null;
let _cache: { at: number; rows: Record<string, ConfigRow> } | null = null;

function getClient(): SupabaseClient {
  if (!_sb) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("notifications: brak NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
    }
    _sb = createClient(url, key);
  }
  return _sb;
}

function parseChatIds(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

async function loadRows(tenant: string): Promise<Record<string, ConfigRow>> {
  if (_cache && Date.now() - _cache.at < CACHE_TTL_MS) {
    return _cache.rows;
  }
  try {
    const { data, error } = await getClient()
      .from("notification_config")
      .select("tenant, bot_token, chat_id, enabled")
      .in("tenant", [GLOBAL_KEY, tenant]);
    if (error) throw error;
    const rows: Record<string, ConfigRow> = {};
    for (const r of (data ?? []) as ConfigRow[]) rows[r.tenant] = r;
    _cache = { at: Date.now(), rows };
    return rows;
  } catch (e) {
    console.error("[notifications] DB read failed, using env fallback:", e);
    return {};
  }
}

/**
 * Rozwiązuje config Telegrama dla tenanta. Nigdy nie rzuca — przy braku
 * bazy/wiersza spada na env. Precedencja: per-tenant → global → env.
 */
export async function getTelegramConfig(tenant: string): Promise<ResolvedTelegramConfig> {
  const rows = await loadRows(tenant);
  const self = rows[tenant];
  const global = rows[GLOBAL_KEY];

  const token =
    self?.bot_token || global?.bot_token || process.env.TELEGRAM_BOT_TOKEN || null;

  const selfChat = parseChatIds(self?.chat_id);
  const globalChat = parseChatIds(global?.chat_id);
  const chatIds = selfChat.length
    ? selfChat
    : globalChat.length
      ? globalChat
      : parseChatIds(process.env.TELEGRAM_CHAT_ID);

  const enabled = (self?.enabled ?? true) && (global?.enabled ?? true);

  return { token, chatIds, enabled };
}

/**
 * Wysyła wiadomość na Telegram do wszystkich chat_id z configu tenanta.
 * Non-blocking-friendly: nigdy nie rzuca, zwraca true jeśli ≥1 wysyłka OK.
 */
export async function sendTelegramMessage(text: string, opts: SendOptions): Promise<boolean> {
  const body = opts.prefix ? `${opts.prefix} ${text}` : text;
  const { token, chatIds, enabled } = await getTelegramConfig(opts.tenant);
  if (!enabled || !token || chatIds.length === 0) return false;

  let anyOk = false;
  for (const chatId of chatIds) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: body,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
      if (res.ok) anyOk = true;
      else console.error("[telegram] sendMessage failed for", chatId, res.status, await res.text());
    } catch (e) {
      console.error("[telegram] sendMessage error for", chatId, e);
    }
  }
  return anyOk;
}
