"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
};

export default function DeleteGalleryButton({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmDelete = confirm("Yakin ingin menghapus galeri ini?");

    if (!confirmDelete) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/galleries/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Gagal menghapus galeri");
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-600 disabled:opacity-60"
    >
      {loading ? "Menghapus..." : "Hapus"}
    </button>
  );
}