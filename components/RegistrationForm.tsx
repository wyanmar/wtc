"use client";

import { useState } from "react";

type Branch = {
  id: number;
  slug: string;
  name: string;
};

type Program = {
  id: number;
  slug: string;
  title: string;
};

type Props = {
  branches: Branch[];
  programs: Program[];
};

export default function RegistrationForm({ branches, programs }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    branchSlug: "",
    programSlug: "",
    address: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/pendaftaran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message || "Pendaftaran gagal.");
      setLoading(false);
      return;
    }

    setMessage("Pendaftaran berhasil dikirim. Admin akan menghubungi Anda.");

    setForm({
      name: "",
      phone: "",
      branchSlug: "",
      programSlug: "",
      address: "",
      notes: "",
    });

    setLoading(false);
  }

  return (
    <form className="mt-8 grid gap-5">
      <input
        type="text"
        placeholder="Nama lengkap"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      <input
        type="text"
        placeholder="Nomor WhatsApp, contoh: 6281234567890"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      <select
        value={form.branchSlug}
        onChange={(e) => setForm({ ...form, branchSlug: e.target.value })}
        className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        <option value="">Pilih cabang</option>
        {branches.map((branch) => (
          <option key={branch.id} value={branch.slug}>
            {branch.name}
          </option>
        ))}
      </select>

      <select
        value={form.programSlug}
        onChange={(e) => setForm({ ...form, programSlug: e.target.value })}
        className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        <option value="">Pilih program</option>
        {programs.map((program) => (
          <option key={program.id} value={program.slug}>
            {program.title}
          </option>
        ))}
      </select>

      <textarea
        rows={4}
        placeholder="Alamat lengkap"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      <textarea
        rows={3}
        placeholder="Catatan tambahan"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Mengirim..." : "Kirim Pendaftaran"}
      </button>

      {message && (
        <p className="rounded-2xl bg-blue-50 p-4 text-center font-medium text-blue-700">
          {message}
        </p>
      )}
    </form>
  );
}