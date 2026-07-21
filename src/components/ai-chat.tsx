"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { IconChat, IconClose, IconSend } from "@/components/icons";

type Message = { role: "user" | "assistant"; content: string };

const MAX_USER_MESSAGES = 20;

export function AiChat() {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, error]);

  const limitReached = messages.filter((m) => m.role === "user").length >= MAX_USER_MESSAGES;

  async function send() {
    const content = input.trim();
    if (!content || loading || limitReached) return;

    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        className="brutal-shadow fixed right-6 bottom-6 z-90 flex size-14 items-center justify-center border-2 border-ink bg-teal text-ink transition-transform hover:-translate-y-0.5"
      >
        {open ? <IconClose /> : <IconChat />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="brutal-shadow fixed inset-x-4 bottom-24 z-90 flex h-[70vh] max-h-[520px] flex-col border-2 border-ink bg-card sm:inset-x-auto sm:right-6 sm:w-96"
          >
            <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-3 text-paper">
              <p className="font-display text-sm">{t("title")}</p>
              <button type="button" onClick={() => setOpen(false)} aria-label={t("close")}>
                <IconClose />
              </button>
            </div>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              <div className="max-w-[85%] border-2 border-ink bg-paper p-3 text-sm leading-relaxed text-ink">
                {t("greeting")}
              </div>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] border-2 border-ink bg-ink p-3 text-sm leading-relaxed text-paper"
                      : "max-w-[85%] border-2 border-ink bg-paper p-3 text-sm leading-relaxed text-ink"
                  }
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="max-w-[85%] border-2 border-ink bg-paper p-3 text-sm text-muted">
                  …
                </div>
              )}
              {error && (
                <div className="max-w-[85%] border-2 border-coral bg-paper p-3 text-sm text-coral">
                  {t("error")}
                </div>
              )}
              {limitReached && (
                <div className="border-2 border-ink bg-paper p-3 text-xs text-muted">
                  {t("limitReached")}
                </div>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t-2 border-ink p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                disabled={loading || limitReached}
                maxLength={500}
                className="min-w-0 flex-1 border-2 border-ink bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={loading || limitReached || !input.trim()}
                aria-label={t("send")}
                className="flex size-10 shrink-0 items-center justify-center border-2 border-ink bg-teal text-ink transition-colors hover:bg-coral disabled:opacity-40"
              >
                <IconSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
