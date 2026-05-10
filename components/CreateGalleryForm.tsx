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
  userRole: string;
  userBranchId?: number | null;
};

export default function CreateGalleryForm({
  branches,
  userRole,
  userBranchId,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [branchId, setBranchId] = useState(userBranchId || "");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/galleries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          branchId,
          isActive,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Gagal membuat galeri");
        return;
      }

      router.push("/admin/galeri");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-xl"
    >
      <div className="grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Judul Galeri
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Kegiatan Belajar Bahasa Jepang"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-400"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Deskripsi
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi singkat galeri"
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Gambar
          </label>
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
        </div>

        {userRole !== "ADMIN_CABANG" && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Cabang
            </label>
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400"
            >
              <option value="">Semua Cabang / Umum</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-5 w-5 rounded border-slate-300"
          />
          Aktifkan galeri
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Simpan Galeri"}
        </button>
      </div>
    </form>
  );
}