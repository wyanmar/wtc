"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Blog = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

type Branch = {
  id: number;
  slug: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  maps: string;
  schedule: string;
  description: string;
};

type Props = {
  branches: Branch[];
  blogs: Blog[];
};

type HomeContentProps = {
  branches: Branch[];
  blogs: Blog[];
};
export default function HomeContent({
  branches,
  blogs,
}: Props) {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-cyan-50/50">
        <div className="absolute right-10 top-10 h-60 w-60 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex rounded-full border border-blue-200 bg-white/70 px-5 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur"
            >
              Lembaga Pelatihan Kerja Profesional
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-7 text-4xl font-bold leading-tight tracking-tight md:text-6xl"
            >
              Bangun Skill Kerja untuk Masa Depan yang Lebih Baik
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg"
            >
              Website resmi LPK dengan program pelatihan, pengembangan skill,
              dan pembinaan tenaga kerja profesional di berbagai cabang.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/daftar"
                className="rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:scale-105 hover:bg-blue-700"
              >
                Daftar Sekarang
              </Link>

              <Link
                href="/cabang"
                className="rounded-2xl border border-slate-300 bg-white/70 px-7 py-4 font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
              >
                Lihat Cabang
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[36px] bg-blue-500/10 blur-2xl" />

            <img
              src="/images/hero.webp"
              alt="Pelatihan LPK"
              className="relative h-[280px] w-full rounded-[28px] object-cover shadow-2xl md:h-[340px]"
            />
          </motion.div>
        </div>
      </section>

      {/* CABANG */}
<section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-20 text-white">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-blue-300">Pilih Cabang</p>
              <h2 className="mt-3 text-4xl font-bold text-white">
                Temukan Cabang Terdekat
              </h2>
            </div>

            <Link
              href="/cabang"
              className="font-semibold text-blue-300 hover:text-white"
            >
              Lihat Semua Cabang →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/cabang/${branch.slug}`}
                  className="block h-full rounded-3xl border border-white/10 bg-white/10 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-2 hover:bg-white/15"
                >
                  <p className="text-sm font-medium text-blue-300">
                    {branch.city}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-white">{branch.name}</h3>

                  <p className="mt-4 line-clamp-3 leading-7 text-slate-300">
                    {branch.description}
                  </p>

                  <div className="mt-8 font-semibold text-cyan-300">
                    Detail Cabang →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/70 via-white to-cyan-50/70" />

        <div className="relative mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-4">
{[
  [`${branches.length}+`, "Kantor & Cabang"],
  ["20+", "Program Pelatihan"],
  ["1000+", "Alumni"],
  ["95%", "Kepuasan Peserta"],
].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/80 bg-white/80 p-8 shadow-sm backdrop-blur"
            >
              <h2 className="text-4xl font-bold text-blue-600">{item[0]}</h2>
              <p className="mt-3 text-slate-600">{item[1]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* KEUNGGULAN */}
<section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-24 text-white">
  <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/50 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/50 blur-3xl" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_45%)]" />

  <div className="relative mx-auto max-w-7xl px-6">
    <p className="font-semibold text-cyan-300">Kenapa Memilih Kami</p>

    <h2 className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
      Pelatihan Kerja Modern dan Profesional
    </h2>

    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {[
        [
          "🎯",
          "Kurikulum Industri",
          "Materi disesuaikan dengan kebutuhan dunia kerja modern.",
        ],
        [
          "🏆",
          "Instruktur Berpengalaman",
          "Dibimbing oleh tenaga profesional dan praktisi berpengalaman.",
        ],
        [
          "🚀",
          "Siap Kerja",
          "Fokus pada pengembangan skill praktis yang dibutuhkan perusahaan.",
        ],
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-white/15"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl shadow-lg">
            {item[0]}
          </div>

          <h3 className="mt-6 text-2xl font-bold text-white">
            {item[1]}
          </h3>

          <p className="mt-4 leading-7 text-slate-300">
            {item[2]}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

 {/* LEGALITAS */}
<section className="relative overflow-hidden bg-gradient-to-br from-blue-60 via-white to-cyan-100 py-24">
  {/* GLOW */}
  <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-400/60 blur-3xl" />

  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/70 blur-3xl" />

  {/* GRID */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:90px_90px]" />

  <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
    <div>
      <p className="font-semibold text-blue-600">
        Legalitas
      </p>

      <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
        Terdaftar dan Beroperasi Secara Resmi
      </h2>

      <p className="mt-6 max-w-xl leading-8 text-slate-600">
        LPK kami menjalankan kegiatan pelatihan berdasarkan legalitas,
        izin operasional, dan standar penyelenggaraan pelatihan kerja
        yang berlaku secara resmi.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <div className="rounded-2xl border border-white/70 bg-white/70 px-5 py-4 shadow-sm backdrop-blur">
          <p className="text-sm text-slate-500">
            Legalitas Aktif
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            Nasional
          </p>
        </div>

        <div className="rounded-2xl border border-white/70 bg-white/70 px-5 py-4 shadow-sm backdrop-blur">
          <p className="text-sm text-slate-500">
            Status Operasional
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            Resmi & Terdaftar
          </p>
        </div>
      </div>
    </div>

    <div className="grid gap-5">
      {[
        "Izin Operasional LPK",
        "Nomor Induk Berusaha / NIB",
        "Sertifikat Kompetensi & Pelatihan",
        "Kerja Sama Industri dan Penempatan",
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-lg backdrop-blur-md transition hover:-translate-y-1 hover:bg-white"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-2xl shadow-sm">
              ✓
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {item}
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Dokumen dan legalitas tersedia serta terverifikasi.
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* DIVIDER */}
<div className="h-[3px] w-full bg-gradient-to-r from-blue-150 via-cyan-100 to-transparent" />
      {/* VIDEO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="font-semibold text-blue-600">Video Profil</p>

            <h2 className="mt-4 text-4xl font-bold">
              Kenali LPK Kami Lebih Dekat
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Tonton video singkat mengenai kegiatan pelatihan, suasana kelas,
              dan fasilitas yang tersedia.
            </p>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white p-3 shadow-xl">
            <iframe
              className="aspect-video w-full rounded-[20px]"
              src="https://www.youtube.com/embed/hZzLy_Sb3LU"
              title="Video Profil LPK"
              allowFullScreen
            />
          </div>
        </div>
      </section>
{/* DIVIDER */}
<div className="mx-auto h-[3px] max-w-7xl bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      {/* BLOG */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/40 py-24">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-blue-600">Blog & Informasi</p>

              <h2 className="mt-4 text-4xl font-bold">
                Update Terbaru dari LPK
              </h2>
            </div>

            <Link
              href="/blog"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Lihat Semua Artikel →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogs.slice(0, 3).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-sm backdrop-blur transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="h-52 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold">{post.title}</h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex font-semibold text-blue-600"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-24 text-white">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Siap Memulai Pelatihan?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Pilih cabang terdekat dan daftar program pelatihan sesuai kebutuhan
            Anda.
          </p>

          <Link
            href="/daftar"
            className="mt-10 inline-flex rounded-2xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition hover:scale-105"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>
    </main>
  );
}