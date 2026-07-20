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
            className="brutal-shadow relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden border-2 border-ink bg-card"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b-2 border-ink px-5 py-4">
              <h3 className="font-display text-base text-ink">
                {certificate.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex size-7 shrink-0 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
