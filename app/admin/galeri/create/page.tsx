import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import CreateGalleryForm from "@/components/CreateGalleryForm";

export default async function CreateGalleryPage() {
  const user = await getAdminSession();

  if (!user) {
    return null;
  }

  const branches = await prisma.branch.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/galeri"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Kembali ke Galeri
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Tambah Galeri
        </h1>
        <p className="mt-2 text-slate-500">
          Upload foto kegiatan, fasilitas, atau dokumentasi cabang.
        </p>
      </div>

      <CreateGalleryForm
        branches={branches}
        userRole={user.role}
        userBranchId={user.branchId}
      />
    </div>
  );
}