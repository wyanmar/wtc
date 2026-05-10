"use client";

import { useState } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpload(file: File) {
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message || "Upload gagal.");
      setLoading(false);
      return;
    }

    onChange(result.url);
    setMessage("Upload berhasil.");
    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-700"
      />

      {loading && (
        <p className="mt-3 text-sm font-medium text-blue-600">
          Mengupload gambar...
        </p>
      )}

      {message && (
        <p className="mt-3 text-sm font-medium text-slate-600">
          {message}
        </p>
      )}

      {value && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
          <img
            src={value}
            alt="Preview upload"
            className="h-48 w-full rounded-xl object-cover"
          />

          <p className="mt-3 break-all text-xs text-slate-500">
            {value}
          </p>
        </div>
      )}
    </div>
  );
}