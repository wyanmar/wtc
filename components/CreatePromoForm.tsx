"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Branch = {
  id: number;
  name: string;
};

type Props = {
  branches: Branch[];
  role: string;
};

export default function CreatePromoForm({ branches, role }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    label: "",
    description: "",
    buttonText: "",
    branchId: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/admin/promos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message || "Gagal membuat promo.");
      setLoading(false);
      return;
    }

    setMessage("Promo berhasil dibuat.");

    setForm({
      title: "",
      label: "",
      description: "",
      buttonText: "",
      branchId: "",
    });

    setLoading(false);
    router.refresh();
  }

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Tambah Promo Baru
      </h2>

      <p className="mt-2 text-slate-500">
        Buat promo khusus untuk cabang tertentu.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Judul promo"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="text"
          placeholder="Label, contoh: Diskon 20%"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="text"
          placeholder="Teks tombol, contoh: Ambil Promo"
          value={form.buttonText}
          onChange={(e) =>
            setForm({ ...form, buttonText: e.target.value })
          }
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        {role !== "ADMIN_CABANG" && (
          <select
            value={form.branchId}
            onChange={(e) =>
              setForm({ ...form, branchId: e.target.value })
            }
            className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Pilih cabang</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        )}

        <textarea
          rows={4}
          placeholder="Deskripsi promo"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:col-span-2"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Menyimpan..." : "Simpan Promo"}
      </button>

      {message && (
        <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm font-medium text-blue-700">
          {message}
        </p>
      )}
    </div>
  );
}