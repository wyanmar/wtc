import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import EditGalleryForm from "@/components/EditGalleryForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditGalleryPage({ params }: Props) {
  const user = await getAdminSession();
  const { id } = await params;

  if (!user) {
    return null;
  }

  const gallery = await prisma.gallery.findUnique({
    where: { id },
  });

  if (!gallery) {
    notFound();
  }

  if (user.role === "ADMIN_CABANG" && gallery.branchId !== user.branchId) {
    notFound();
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
          Edit Galeri
        </h1>
        <p className="mt-2 text-slate-500">
          Perbarui foto, deskripsi, status, atau cabang galeri.
        </p>
      </div>

      <EditGalleryForm
        gallery={gallery}
        branches={branches}
        userRole={user.role}
        userBranchId={user.branchId}
      />
    </div>
  );
}