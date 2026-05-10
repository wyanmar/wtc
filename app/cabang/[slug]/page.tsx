import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { packages } from "@/data/packages";
import { schedules } from "@/data/schedules";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const branch = await prisma.branch.findUnique({
    where: { slug },
  });

  if (!branch) {
    return {
      title: "Cabang Tidak Ditemukan",
    };
  }

  return {
    title: `${branch.name} | LPK WTC BALI`,
    description: branch.description,
    openGraph: {
      title: branch.name,
      description: branch.description,
      images: [branch.image],
    },
  };
}

export default async function BranchDetailPage({ params }: Props) {
  const { slug } = await params;

  const branch = await prisma.branch.findUnique({
    where: {
      slug,
    },
  });

  if (!branch) {
    notFound();
  }

  const branchPrograms = await prisma.program.findMany({
    where: {
      branchId: branch.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const branchPromotions = await prisma.promotion.findMany({
    where: {
      branchId: branch.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const branchBlogs = await prisma.blog.findMany({
    where: {
      branchId: branch.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const branchGalleries = await prisma.gallery.findMany({
    where: {
      isActive: true,
      branchId: branch.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  const branchPackages = packages.filter(
    (item) => item.branchSlug === branch.slug
  );

const branchTestimonials = await prisma.testimonial.findMany({
  where: {
    branchId: branch.id,
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 6,
});

  const branchSchedules = schedules.filter(
    (item) => item.branchSlug === branch.slug
  );

  return (
        <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
      {/* HERO */}
     <section className="relative overflow-hidden py-20">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
          <div>
            <p className="font-semibold text-blue-600">
              Cabang {branch.city}
            </p>

<Reveal>           <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-900">
              {branch.name}
            </h1>
</Reveal>
            <p className="mt-6 leading-8 text-slate-600">
              {branch.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${branch.phone}`}
                target="_blank"
                className="rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Hubungi Admin
              </a>

              <a
                href={branch.maps}
                target="_blank"
                className="rounded-2xl border border-slate-300 bg-white/70 px-7 py-4 font-semibold text-slate-700 transition hover:bg-white"
              >
                Lihat Lokasi
              </a>
            </div>
          </div>

        <Reveal>  <div className="overflow-hidden rounded-[32px] border border-white/80 bg-white p-3 shadow-2xl">
            <img
              src={branch.image}
              alt={branch.name}
              className="h-[420px] w-full rounded-[24px] object-cover"
            />
          </div></Reveal>
        </div>
      </section>

      {/* INFO */}
     <section className="relative z-10 -mt-6 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 rounded-[32px] border border-white/70 bg-white/85 p-5 shadow-xl backdrop-blur md:grid-cols-4">
            {[
              ["📍", "Alamat", branch.address],
              ["📞", "Telepon", branch.phone],
              ["✉️", "Email", branch.email],
              ["🕒", "Jadwal", branch.schedule],
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl p-4 transition hover:bg-blue-50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-lg">
                  {item[0]}
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item[1]}
                  </p>

                  <h2 className="mt-1 text-base font-bold leading-6 text-slate-900">
                    {item[2]}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* PROGRAM */}
      {branchPrograms.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-24 text-white">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="mx-auto max-w-7xl px-6">
            <p className="font-semibold text-cyan-300">Program Cabang</p>

            <h2 className="mt-4 text-5xl font-bold">Program Pelatihan</h2>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {branchPrograms.map((program) => (
                <article
                  key={program.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-md transition hover:-translate-y-2 hover:bg-white/15"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-7">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-cyan-300">
                        {program.category}
                      </span>

                      <span className="text-sm text-slate-300">
                        {program.duration}
                      </span>
                    </div>

                    <h3 className="mt-5 text-2xl font-bold">
                      {program.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-300">
                      {program.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-xl font-bold text-cyan-300">
                        {program.price}
                      </p>

                      <Link
                        href={`/program/${program.slug}`}
                        className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
                      >
                        Detail →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROMO CABANG */}
      {branchPromotions.length > 0 && (
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6">
            <p className="font-semibold text-blue-600">Promo Cabang</p>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Penawaran Khusus di {branch.name}
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {branchPromotions.map((promo) => (
                <div
                  key={promo.id}
                  className="rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur transition hover:-translate-y-2"
                >
                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                    {promo.label}
                  </span>

                  <h3 className="mt-6 text-3xl font-bold text-slate-900">
                    {promo.title}
                  </h3>

                  <p className="mt-4 leading-8 text-slate-600">
                    {promo.description}
                  </p>

                  <a
                    href={`https://wa.me/${branch.phone}`}
                    target="_blank"
                    className="mt-8 inline-flex rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    {promo.buttonText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PACKAGE */}
      {branchPackages.length > 0 && (
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40" />
          <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6">
            <p className="font-semibold text-blue-600">Paket Program</p>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Paket Pelatihan Unggulan
            </h2>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {branchPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white/85 p-10 shadow-2xl backdrop-blur transition hover:-translate-y-2"
                >
                  <div className="absolute right-0 top-0 rounded-bl-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white">
                    {pkg.badge}
                  </div>

                  <h3 className="text-3xl font-bold text-slate-900">
                    {pkg.title}
                  </h3>

                  <div className="mt-6 flex items-end gap-3">
                    <p className="text-5xl font-bold text-blue-600">
                      {pkg.price}
                    </p>

                    <span className="pb-2 text-slate-500">
                      / {pkg.duration}
                    </span>
                  </div>

                  <div className="mt-10 space-y-4">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          ✓
                        </div>

                        <p className="text-slate-700">{feature}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/${branch.phone}`}
                    target="_blank"
                    className="mt-10 inline-flex rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
                  >
                    Ambil Paket
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
 {/* JADWAL PELATIHAN */}
      {branchSchedules.length > 0 && (
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/60" />

          <div className="relative mx-auto max-w-7xl px-6">
            <p className="font-semibold text-blue-600">Jadwal Pelatihan</p>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Kelas Terdekat di {branch.name}
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {branchSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur transition hover:-translate-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                      {schedule.date}
                    </span>

                    <span className="text-sm font-medium text-slate-500">
                      {schedule.quota}
                    </span>
                  </div>

                  <h3 className="mt-6 text-3xl font-bold text-slate-900">
                    {schedule.program}
                  </h3>

                  <p className="mt-4 text-slate-600">
                    Waktu pelatihan: {schedule.time}
                  </p>

                  <a
                    href="/daftar"
                    className="mt-8 inline-flex rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Daftar Kelas
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONI */}
      {branchTestimonials.length > 0 && (
      <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/70" />

          <div className="relative mx-auto max-w-7xl px-6">
            <p className="font-semibold text-blue-600">
              Alumni & Testimoni
            </p>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Cerita Alumni Kami
            </h2>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {branchTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur transition hover:-translate-y-2"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {item.name}
                      </h3>

                      <p className="text-slate-500">{item.job}</p>

                      <div className="mt-2 flex text-yellow-400">
                        {"★".repeat(item.rating)}
                      </div>
                    </div>
                  </div>

                  <p className="mt-8 leading-8 text-slate-600">
                    "{item.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto my-8 h-[2px] w-[60%] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />


      {/* BLOG CABANG */}
      {branchBlogs.length > 0 && (
      <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40" />

          <div className="relative mx-auto max-w-7xl px-6">
            <p className="font-semibold text-blue-600">
              Informasi {branch.name}
            </p>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Artikel & Update Terbaru
            </h2>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {branchBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="overflow-hidden rounded-[32px] border border-white/80 bg-white/85 shadow-xl backdrop-blur transition hover:-translate-y-2"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-7">
                    <p className="text-sm text-slate-500">
                      {blog.category}
                    </p>

                    <h3 className="mt-4 text-2xl font-bold text-slate-900">
                      {blog.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                      {blog.excerpt}
                    </p>

                    <div className="mt-6 font-semibold text-blue-600">
                      Baca Selengkapnya →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALERI CABANG */}
      {branchGalleries.length > 0 && (
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/70" />

          <div className="relative mx-auto max-w-7xl px-6">
            <p className="font-semibold text-blue-600">Galeri Cabang</p>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Dokumentasi Kegiatan
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-4">
              {branchGalleries.map((item, index) => (
                <div
                  key={item.id}
                  className={`group overflow-hidden rounded-[28px] shadow-xl ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div className="relative h-72 md:h-full">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-white/80">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

     
      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-[40px] bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-14 text-center text-white shadow-2xl">
            <h2 className="text-5xl font-bold">Siap Bergabung?</h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
              Hubungi admin cabang {branch.city} sekarang dan pilih program
              pelatihan sesuai kebutuhan Anda.
            </p>

            <a
              href={`https://wa.me/${branch.phone}`}
              target="_blank"
              className="mt-10 inline-flex rounded-2xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:scale-105"
            >
              Hubungi Sekarang
            </a>
          </div>
        </div>
      </section>

      <FloatingWhatsApp phone={branch.phone} branchName={branch.city} />
    </main>
  );
}