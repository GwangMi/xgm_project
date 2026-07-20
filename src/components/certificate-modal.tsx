"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export type CertificateInfo = { title: string; image: string };

export function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: CertificateInfo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!certificate) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_40px_var(--glow)]"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <h3 className="font-display text-sm font-semibold">
                {certificate.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
