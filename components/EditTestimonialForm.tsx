"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

type Branch = {
  id: number;
  name: string;
};

type Testimonial = {
  id: number;
  name: string;
  job: string;
  image: string;
  rating: number;
  message: string;
  branchId: number;
};

type Props = {
  testimonial: Testimonial;
  branches: Branch[];
  role: string;
};

export default function EditTestimonialForm({
  testimonial,
  branches,
  role,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: testimonial.name,
    job: testimonial.job,
    image: testimonial.image,
    rating: String(testimonial.rating),
    message: testimonial.message,
    branchId: String(testimonial.branchId),
  });

  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setMessageText("");

    const response = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessageText(result.message || "Gagal memperbarui testimoni.");
      setLoading(false);
      return;
    }

    setMessageText("Testimoni berhasil diperbarui.");
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="text"
          placeholder="Pekerjaan / asal / program"
          value={form.job}
          onChange={(e) => setForm({ ...form, job: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="5">★★★★★ - 5</option>
          <option value="4">★★★★ - 4</option>
          <option value="3">★★★ - 3</option>
          <option value="2">★★ - 2</option>
          <option value="1">★ - 1</option>
        </select>

        {role !== "ADMIN_CABANG" && (
          <select
            value={form.branchId}
            onChange={(e) => setForm({ ...form, branchId: e.target.value })}
            className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        )}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Foto Testimoni
          </label>

          <ImageUpload
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />
        </div>

        <textarea
          rows={5}
          placeholder="Isi testimoni"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
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
          onClick={() => router.push("/admin/testimoni")}
          className="rounded-2xl bg-slate-200 px-6 py-4 font-semibold text-slate-700 hover:bg-slate-300"
        >
          Kembali
        </button>
      </div>

      {messageText && (
        <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm font-medium text-blue-700">
          {messageText}
        </p>
      )}
    </div>
  );
}