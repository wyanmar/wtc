import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
export const metadata = {
  title: "Galeri | LPK",
  description: "Dokumentasi kegiatan, kelas, fasilitas, dan aktivitas LPK.",
};

export default async function GalleryPage() {
  const galleries = await prisma.gallery.findMany({
    where: {
      isActive: true,
    },
    include: {
      branch: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-600">
            Galeri LPK
          </p>
 <Reveal>        <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Dokumentasi Kegiatan dan Fasilitas
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Lihat suasana belajar, kegiatan siswa, fasilitas, dan aktivitas dari
            berbagai cabang LPK.
          </p></Reveal> 
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleries.map((gallery) => (
            <article
              key={gallery.id}
              className="group overflow-hidden rounded-[32px] border border-white/30 bg-white/75 shadow-xl backdrop-blur-xl"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={gallery.imageUrl}
                  alt={gallery.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold text-cyan-600">
                  {gallery.branch?.name || "LPK"}
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {gallery.title}
                </h2>

                {gallery.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {gallery.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {galleries.length === 0 && (
          <div className="mt-14 rounded-[32px] border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-bold text-slate-800">
              Galeri belum tersedia
            </h2>
            <p className="mt-2 text-slate-500">
              Dokumentasi kegiatan akan segera ditampilkan.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}