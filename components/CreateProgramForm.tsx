"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

type Branch = {
  id: number;
  name: string;
};

type Props = {
  branches: Branch[];
  role: string;
};

export default function CreateProgramForm({ branches, role }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    branchId: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .replaceAll(" ", "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  async function handleSubmit() {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/admin/programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message || "Gagal menambah program.");
      setLoading(false);
      return;
    }

    setMessage("Program berhasil ditambahkan.");

    setForm({
      title: "",
      slug: "",
      category: "",
      duration: "",
      price: "",
      image: "",
      description: "",
      branchId: "",
    });

    setLoading(false);
    router.refresh();
  }

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Tambah Program Baru
      </h2>

      <p className="mt-2 text-slate-500">
        Lengkapi data program pelatihan berikut.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Nama program"
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm({
              ...form,
              title,
              slug: generateSlug(title),
            });
          }}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="text"
          placeholder="Slug program"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="text"
          placeholder="Kategori, contoh: Hospitality"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="text"
          placeholder="Durasi, contoh: 3 Bulan"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="text"
          placeholder="Harga, contoh: Rp 2.500.000"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

<div className="md:col-span-2">
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Gambar Program
  </label>

  <ImageUpload
    value={form.image}
    onChange={(url) => setForm({ ...form, image: url })}
  />
</div>

        {role !== "ADMIN_CABANG" && (
          <select
            value={form.branchId}
            onChange={(e) => setForm({ ...form, branchId: e.target.value })}
            className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:col-span-2"
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
          placeholder="Deskripsi program"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:col-span-2"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Menyimpan..." : "Simpan Program"}
      </button>

      {message && (
        <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm font-medium text-blue-700">
          {message}
        </p>
      )}
    </div>
  );
}