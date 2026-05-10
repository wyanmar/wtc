import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  const whereBranch =
    session?.role === "ADMIN_CABANG" && session?.branchId
      ? { branchId: session.branchId }
      : {};

  const [
    totalRegistrations,
    totalPrograms,
    totalPromos,
    totalBlogs,
    totalBranches,
    baru,
    dihubungi,
    proses,
    diterima,
    ditolak,
  ] = await Promise.all([
    prisma.registration.count({ where: whereBranch }),
    prisma.program.count({ where: whereBranch }),
    prisma.promotion.count({ where: whereBranch }),
    prisma.blog.count({ where: whereBranch }),
    prisma.branch.count(),
    prisma.registration.count({ where: { ...whereBranch, status: "BARU" } }),
    prisma.registration.count({
      where: { ...whereBranch, status: "DIHUBUNGI" },
    }),
    prisma.registration.count({ where: { ...whereBranch, status: "PROSES" } }),
    prisma.registration.count({
      where: { ...whereBranch, status: "DITERIMA" },
    }),
    prisma.registration.count({ where: { ...whereBranch, status: "DITOLAK" } }),
  ]);

  const stats = [
    {
      title: "Total Pendaftar",
      value: totalRegistrations,
      note: "Data pendaftaran masuk",
      href: "/admin/pendaftaran",
    },
    {
      title: "Program Aktif",
      value: totalPrograms,
      note: "Program pelatihan",
      href: "/admin/program",
    },
    {
      title: "Promo",
      value: totalPromos,
      note: "Promo cabang",
      href: "/admin/promo",
    },
    {
      title: "Blog",
      value: totalBlogs,
      note: "Artikel informasi",
      href: "/admin/blog",
    },
  ];

  const statusStats = [
    { label: "BARU", value: baru, href: "/admin/pendaftaran?status=BARU" },
    {
      label: "DIHUBUNGI",
      value: dihubungi,
      href: "/admin/pendaftaran?status=DIHUBUNGI",
    },
    {
      label: "PROSES",
      value: proses,
      href: "/admin/pendaftaran?status=PROSES",
    },
    {
      label: "DITERIMA",
      value: diterima,
      href: "/admin/pendaftaran?status=DITERIMA",
    },
    {
      label: "DITOLAK",
      value: ditolak,
      href: "/admin/pendaftaran?status=DITOLAK",
    },
  ];

  return (
    <main className="p-6 md:p-10">
      <div>
        <p className="font-semibold text-blue-600">Dashboard</p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Ringkasan Admin
        </h1>

        <p className="mt-2 text-slate-500">
          Statistik realtime berdasarkan data website dan hak akses admin.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm text-slate-500">{stat.title}</p>

            <h3 className="mt-3 text-4xl font-bold text-slate-900">
              {stat.value}
            </h3>

            <p className="mt-3 text-sm font-medium text-blue-600">
              {stat.note}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Status Pendaftaran
              </h2>

              <p className="mt-1 text-slate-500">
                Pantau proses follow-up calon peserta.
              </p>
            </div>

            <Link
              href="/admin/pendaftaran"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {statusStats.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-blue-300 hover:bg-blue-50"
              >
                <p className="text-3xl font-bold text-slate-900">
                  {item.value}
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-500">
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-7 text-white shadow-xl">
          <h2 className="text-2xl font-bold">CMS Multi Cabang</h2>

          <p className="mt-4 leading-8 text-blue-100">
            {session?.role === "ADMIN_CABANG"
              ? "Anda sedang mengelola data khusus cabang Anda."
              : "Anda dapat memantau dan mengelola seluruh data cabang."}
          </p>

          <div className="mt-6 rounded-2xl bg-white/15 p-5">
            <p className="text-sm text-blue-100">Total Cabang</p>
            <p className="mt-2 text-4xl font-bold">{totalBranches}</p>
          </div>
        </div>
      </div>
    </main>
  );
}