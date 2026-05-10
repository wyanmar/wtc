"use client";

import { useEffect, useState } from "react";

type Props = {
  phone: string;
  branchName: string;
};

export default function FloatingWhatsApp({
  phone,
  branchName,
}: Props) {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4">
      {showBubble && (
        <div className="relative max-w-xs rounded-3xl border border-slate-200 bg-white p-5 pr-10 shadow-2xl">
          <button
            onClick={() => setShowBubble(false)}
            className="absolute right-4 top-3 text-lg text-slate-400 hover:text-slate-700"
            aria-label="Tutup pesan WhatsApp"
          >
            ×
          </button>

          <p className="text-sm font-semibold text-green-600">
            Admin {branchName}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Halo 👋 Ada yang bisa kami bantu terkait program pelatihan?
          </p>
        </div>
      )}

      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110"
      >
        <div className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />

        <svg
          className="relative h-9 w-9"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.02 3C8.84 3 3 8.74 3 15.8c0 2.25.6 4.45 1.74 6.38L3.1 29l6.99-1.6A13.2 13.2 0 0 0 16.02 28C23.2 28 29 22.26 29 15.2S23.2 3 16.02 3Zm0 22.8c-1.9 0-3.75-.5-5.38-1.45l-.39-.23-4.14.95.98-4.02-.25-.41A10.34 10.34 0 0 1 5.3 15.8c0-5.84 4.82-10.6 10.72-10.6 5.92 0 10.73 4.76 10.73 10.6 0 5.84-4.81 10.6-10.73 10.6Zm5.88-7.92c-.32-.16-1.88-.92-2.17-1.03-.29-.1-.5-.16-.72.16-.21.32-.83 1.03-1.02 1.24-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.58-.96-.85-1.6-1.9-1.8-2.22-.19-.32-.02-.49.14-.65.15-.15.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.57-.08-.16-.72-1.72-.98-2.36-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.08-1.12 2.63s1.15 3.06 1.31 3.27c.16.21 2.27 3.43 5.5 4.8.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.88-.76 2.15-1.5.27-.74.27-1.37.19-1.5-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </a>
    </div>
  );
}