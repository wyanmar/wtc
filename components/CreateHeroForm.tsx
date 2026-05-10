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

export default function CreateHeroForm({
  branches,
  userRole,
  userBranchId,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const [branchId, setBranchId] = useState(
    userBranchId ? String(userBranchId) : ""
  );

  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subtitle,
          description,
          imageUrl,
          buttonText,
          buttonLink,
          branchId,
          isActive,
          sortOrder,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Gagal membuat hero");
        return;
      }

      router.push("/admin/hero");
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
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul Hero"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
          required
        />

        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Subtitle"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi"
          rows={5}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
          required
        />

        <div>
          <p className="mb-2 text-sm font-semibold text-slate-700">
            Gambar Hero
          </p>

          <ImageUpload value={imageUrl} onChange={setImageUrl} />
        </div>

        <input
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          placeholder="Text Button"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
        />

        <input
          value={buttonLink}
          onChange={(e) => setButtonLink(e.target.value)}
          placeholder="/daftar"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
        />

        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          placeholder="Urutan"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
        />

        {userRole !== "ADMIN_CABANG" && (
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
          >
            <option value="">Homepage Utama</option>

            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        )}

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />

          <span className="text-sm font-medium text-slate-700">
            Aktifkan Hero
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg"
        >
          {loading ? "Menyimpan..." : "Simpan Hero"}
        </button>
      </div>
    </form>
  );
}