import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import ReactMarkdown from "react-markdown";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const program = await prisma.program.findUnique({
    where: { slug },
  });

  if (!program) {
    return {
      title: "Program Tidak Ditemukan",
    };
  }

  return {
    title: `${program.title} | LPK WTC BALI`,
    description: program.description,
    openGraph: {
      title: program.title,
      description: program.description,
      images: [program.image],
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;

  const program = await prisma.program.findUnique({
    where: {
      slug,
    },
    include: {
      branch: true,
    },
  });

  if (!program) {
    notFound();
  }

  const relatedPrograms = await prisma.program.findMany({
    where: {
      branchId: program.branchId,
      NOT: {
        id: program.id,
      },
    },
    take: 3,
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
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <p className="font-semibold text-blue-600">
                  {program.branch.name}
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                  {program.title}
                </h1>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                    {program.category}
                  </span>

                  <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-600">
                    {program.duration}
                  </span>
                </div>

                <p className="mt-8 leading-8 text-slate-600">
                  {program.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-sm text-slate-500">Biaya Program</p>

                    <p className="text-3xl font-bold text-blue-600">
                      {program.price}
                    </p>
                  </div>

                  <Link
                    href="/daftar"
                    className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Daftar Sekarang
                  </Link>

                  <Link
                    href={`/cabang/${program.branch.slug}`}
                    className="rounded-2xl border border-slate-300 bg-white/80 px-6 py-4 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                  >
                    Lihat Cabang
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative h-[300px] overflow-hidden rounded-[40px] border border-white/80 bg-white p-3 shadow-2xl backdrop-blur md:h-[460px]">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="rounded-[30px] object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="rounded-[36px] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur md:p-10">
              <p className="font-semibold text-blue-600">
                Tentang Program
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Informasi Pelatihan
              </h2>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-blue-50 p-6">
                  <p className="text-sm font-medium text-blue-600">
                    Kategori
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {program.category}
                  </p>
                </div>

                <div className="rounded-3xl bg-cyan-50 p-6">
                  <p className="text-sm font-medium text-cyan-600">
                    Durasi
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {program.duration}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-50 p-6">
                  <p className="text-sm font-medium text-slate-500">
                    Cabang
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {program.branch.name}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-slate-50 p-6">
                <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-8 prose-li:text-slate-700">
  <ReactMarkdown>
    {program.description}
  </ReactMarkdown>
</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
{/* DIVIDER */}
<div className="h-[3px] w-full bg-gradient-to-r from-blue-150 via-cyan-100 to-transparent" />
 
      {relatedPrograms.length > 0 && (
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-blue-600">
                  Program Lainnya
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  Program Serupa
                </h2>
              </div>

              <Link
                href="/program"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {relatedPrograms.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.08}>
                  <article className="overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-sm backdrop-blur transition hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                        {item.category}
                      </span>

                      <h3 className="mt-4 text-2xl font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
                        {item.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-4">
                        <p className="font-bold text-blue-600">
                          {item.price}
                        </p>

                        <Link
                          href={`/program/${item.slug}`}
                          className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                          Detail →
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}