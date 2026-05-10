"use client";

import { useRouter, useSearchParams } from "next/navigation";

const statuses = ["SEMUA", "BARU", "DIHUBUNGI", "PROSES", "DITERIMA", "DITOLAK"];

export default function RegistrationStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "SEMUA";

  function handleChange(status: string) {
    if (status === "SEMUA") {
      router.push("/admin/pendaftaran");
      return;
    }

    router.push(`/admin/pendaftaran?status=${status}`);
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => handleChange(status)}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            currentStatus === status
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}