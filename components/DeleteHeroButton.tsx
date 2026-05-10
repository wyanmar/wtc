"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
};

export default function DeleteHeroButton({ id }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmDelete = confirm("Hapus hero banner ini?");

    if (!confirmDelete) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/hero/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();

        alert(data.message || "Gagal menghapus hero");
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
      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
    >
      {loading ? "Menghapus..." : "Hapus"}
    </button>
  );
}