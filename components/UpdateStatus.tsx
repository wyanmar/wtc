"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
  currentStatus: string;
};

const statuses = [
  "BARU",
  "DIHUBUNGI",
  "PROSES",
  "DITERIMA",
  "DITOLAK",
];

export default function UpdateStatus({
  id,
  currentStatus,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const status = e.target.value;

    setLoading(true);

    await fetch(`/api/pendaftaran/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    setLoading(false);

    router.refresh();
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleChange}
      disabled={loading}
      className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}