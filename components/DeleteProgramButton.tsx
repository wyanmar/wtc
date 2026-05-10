"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
};

export default function DeleteProgramButton({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmDelete = confirm(
      "Yakin ingin menghapus program ini?"
    );

    if (!confirmDelete) return;

    setLoading(true);

    await fetch(`/api/admin/programs/${id}`, {
      method: "DELETE",
    });

    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-xl bg-red-50 px-4 py-2 font-semibold text-red-600 hover:bg-red-100 disabled:opacity-60"
    >
      {loading ? "..." : "Hapus"}
    </button>
  );
}