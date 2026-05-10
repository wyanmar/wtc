"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

type Branch = {
  id: number;
  slug: string;
  name: string;
};

type Program = {
  id: number;
  slug: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  branchId: number;
  branch: Branch;
};

type Props = {
  programs: Program[];
  branches: Branch[];
};

export default function ProgramContent({ programs, branches }: Props) {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");

  const categories = Array.from(
    new Set(programs.map((program) => program.category))
  );

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchSearch = program.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchBranch = branch ? program.branch.slug === branch : true;

      const matchCategory = category ? program.category === category : true;

      return matchSearch && matchBranch && matchCategory;
    });
  }, [search, branch, category, programs]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/50">
      <section className="relative overflow-hidden py-20">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="font-semibold text-blue-600">Program Pelatihan</p>
<Reveal>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold text-slate-900">
            Temukan Program Pelatihan Sesuai Minat dan Karier Anda
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-slate-600">
            Cari dan filter program berdasarkan cabang, kategori, dan kebutuhan
            pelatihan Anda.
          </p>
</Reveal>
          <div className="mt-10 grid gap-4 rounded-[32px] border border-white/80 bg-white/85 p-5 shadow-xl backdrop-blur md:grid-cols-3">
            <input
              type="text"
              placeholder="Cari nama program..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Semua Cabang</option>
              {branches.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Semua Kategori</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Menampilkan {filteredPrograms.length} program.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {filteredPrograms.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3">
              {filteredPrograms.map((program) => (
                <article
                  key={program.id}
                  className="overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-sm backdrop-blur transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-60 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                        {program.category}
                      </span>

                      <span className="text-sm text-slate-500">
                        {program.duration}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-medium text-slate-500">
                      {program.branch.name}
                    </p>

                    <h2 className="mt-3 text-2xl font-bold text-slate-900">
                      {program.title}
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600">
                      {program.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="text-xl font-bold text-blue-600">
                        {program.price}
                      </p>

                      <Link
                        href={`/program/${program.slug}`}
                        className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                      >
                        Detail →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] border border-white/80 bg-white/85 p-10 text-center shadow-xl backdrop-blur">
              <h2 className="text-2xl font-bold text-slate-900">
                Program tidak ditemukan
              </h2>

              <p className="mt-3 text-slate-600">
                Coba gunakan kata kunci, cabang, atau kategori lain.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}