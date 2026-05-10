import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
export const metadata = {
  title: "Blog & Informasi",
  description:
    "Artikel, berita, dan informasi terbaru seputar program pelatihan kerja dan kegiatan LPK.",
};

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/50">
      <section className="relative overflow-hidden py-20">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="font-semibold text-blue-600">Blog & Informasi</p>
<Reveal> 
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-slate-900 md:text-5xl">
            Update Terbaru Seputar Pelatihan Kerja
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-slate-600">
            Temukan artikel, berita, tips karier, dan informasi terbaru dari
            LPK.
          </p>
</Reveal> 
          {blogs.length === 0 ? (
            <div className="mt-14 rounded-3xl border border-white/80 bg-white/85 p-10 text-center shadow-sm backdrop-blur">
              <h2 className="text-2xl font-bold text-slate-900">
                Belum ada artikel
              </h2>
              <p className="mt-3 text-slate-600">
                Artikel terbaru akan ditampilkan di halaman ini.
              </p>
            </div>
          ) : (
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-sm backdrop-blur transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-7">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600">
                        {blog.category}
                      </span>
                      <span>{blog.date}</span>
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-slate-900">
                      {blog.title}
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600">
                      {blog.excerpt}
                    </p>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="mt-6 inline-flex font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}