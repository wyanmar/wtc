import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CabangPage() {
  const branches = await prisma.branch.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/50">
      <section className="relative overflow-hidden py-20">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="font-semibold text-blue-600">Cabang LPK</p>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold text-slate-900">
            Pilih Cabang Terdekat
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-slate-600">
            Temukan kantor pusat dan cabang LPK yang paling dekat dengan lokasi Anda.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {branches.map((branch) => (
              <Link
                key={branch.id}
                href={`/cabang/${branch.slug}`}
                className="group overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-sm backdrop-blur transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <p className="text-sm font-medium text-blue-600">
                    {branch.city}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-slate-900">
                    {branch.name}
                  </h2>

                  <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                    {branch.description}
                  </p>

                  <p className="mt-6 font-semibold text-blue-600">
                    Detail Cabang →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}