"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

type Branch = {
  id: number;
  name: string;
};

type Gallery = {
  id: string;
  branchId: number | null;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  description: string | null;
  title: string;
  imageUrl: string;
  isActive: boolean;
};

type Props = {
  gallery: Gallery;
  branches: Branch[];
  userRole: string;
  userBranchId?: number | null;
};

export default function EditGalleryForm({
  gallery,
  branches,
  userRole,
  userBranchId,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(gallery.title);
  const [description, setDescription] = useState(gallery.description || "");
  const [imageUrl, setImageUrl] = useState(gallery.imageUrl);
  const [branchId, setBranchId] = useState(
    userRole === "ADMIN_CABANG" ? userBranchId || "" : gallery.branchId || ""
  );
  const [isActive, setIsActive] = useState(gallery.isActive);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/galleries/${gallery.id}`, {
        method: "PATCH",
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
        alert(data.message || "Gagal update galeri");
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
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
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
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
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
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
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
          {loading ? "Menyimpan..." : "Update Galeri"}
        </button>
      </div>
    </form>
  );
}