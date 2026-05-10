"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Branch = {
  id: number;
  name: string;
};

type Promo = {
  id: number;
  title: string;
  label: string;
  description: string;
  buttonText: string;
  branchId: number;
};

type Props = {
  promo: Promo;
  branches: Branch[];
  role: string;
};

export default function EditPromoForm({ promo, branches, role }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: promo.title,
    label: promo.label,
    description: promo.description,
    buttonText: promo.buttonText,
    branchId: String(promo.branchId),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setMessage("");

    const response = await fetch(`/api/admin/promos/${promo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const text = await response.text();

    let result;

    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      result = {};
    }

    if (!response.ok) {
      setMessage(result.message || "Gagal memperbarui promo.");
      setLoading(false);
      return;
    }

    setMessage("Promo berhasil diperbarui.");
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Judul promo"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="text"
          placeholder="Label promo"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="text"
          placeholder="Teks tombol"
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
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        )}

        <textarea
          rows={5}
          placeholder="Deskripsi promo"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:col-span-2"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/promo")}
          className="rounded-2xl bg-slate-200 px-6 py-4 font-semibold text-slate-700 hover:bg-slate-300"
        >
          Kembali
        </button>
      </div>

      {message && (
        <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm font-medium text-blue-700">
          {message}
        </p>
      )}
    </div>
  );
}