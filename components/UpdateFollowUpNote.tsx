"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
  currentNote?: string | null;
  currentStatus: string;
};

export default function UpdateFollowUpNote({
  id,
  currentNote,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [note, setNote] = useState(currentNote || "");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);

    await fetch(`/api/pendaftaran/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  followUpNote: note,
}),
    });

    setLoading(false);
    router.refresh();
  }

  return (
    <div className="grid gap-2">
      <textarea
        rows={2}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Catatan follow-up admin..."
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
      />

      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100 disabled:opacity-60"
      >
        {loading ? "Menyimpan..." : "Simpan Catatan"}
      </button>
    </div>
  );
}