import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import DeleteGalleryButton from "@/components/DeleteGalleryButton";

export default async function AdminGalleryPage() {
  const user = await getAdminSession();

  if (!user) {
    return null;
  }

  const where =
    user.role === "ADMIN_CABANG"
      ? { branchId: user.branchId }
      : {};

  const galleries = await prisma.gallery.findMany({
    where,
    include: {
      branch: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 rounded-[32px] bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-xl md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">
            Admin CMS
          </p>
          <h1 className="mt-2 text-3xl font-bold">Galeri</h1>
          <p className="mt-2 max-w-2xl text-blue-50">
            Kelola dokumentasi kegiatan, suasana kelas, fasilitas, dan aktivitas
            setiap cabang LPK.
          </p>
        </div>

        <Link
          href="/admin/galeri/create"
          className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-lg transition hover:scale-105"
        >
          + Tambah Galeri
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className="overflow-hidden rounded-[32px] border border-white/20 bg-white/75 shadow-xl backdrop-blur-xl"
          >
            <div className="relative h-56 w-full">
              <Image
                src={gallery.imageUrl}
                alt={gallery.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4 p-5">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="line-clamp-1 text-lg font-bold text-slate-800">
                    {gallery.title}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      gallery.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {gallery.isActive ? "Aktif" : "Draft"}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {gallery.branch?.name || "Semua Cabang"}
                </p>

                {gallery.description && (
                  <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                    {gallery.description}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/admin/galeri/${gallery.id}/edit`}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-slate-700"
                >
                  Edit
                </Link>

                <DeleteGalleryButton id={gallery.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {galleries.length === 0 && (
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-xl backdrop-blur-xl">
          <h2 className="text-xl font-bold text-slate-800">
            Belum ada galeri
          </h2>
          <p className="mt-2 text-slate-500">
            Tambahkan foto kegiatan atau fasilitas LPK pertama Anda.
          </p>
        </div>
      )}
    </div>
  );
}