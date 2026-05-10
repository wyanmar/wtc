import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import CreateProgramForm from "@/components/CreateProgramForm";
import DeleteProgramButton from "@/components/DeleteProgramButton";
import Link from "next/link";

export default async function AdminProgramPage() {
  const session = await getAdminSession();

  const branches = await prisma.branch.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const programs = await prisma.program.findMany({
    where:
      session?.role === "ADMIN_CABANG" && session?.branchId
        ? {
            branchId: session.branchId,
          }
        : {},
    include: {
      branch: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="font-semibold text-blue-600">Admin Program</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Kelola Program Pelatihan
          </h1>

          <p className="mt-2 text-slate-500">
            Daftar program pelatihan dari database.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Cari program..."
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <select className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
              <option>Semua Cabang</option>
              {branches.map((branch) => (
                <option key={branch.id}>{branch.name}</option>
              ))}
            </select>

            <select className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>
          </div>
        </div>

        <CreateProgramForm
          branches={branches}
          role={session?.role || "ADMIN_CABANG"}
        />

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Durasi</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Cabang</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {programs.map((program) => (
                <tr key={program.id} className="border-t border-slate-100">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="h-14 w-14 rounded-2xl object-cover"
                      />

                      <div>
                        <p className="font-bold text-slate-900">
                          {program.title}
                        </p>

                        <p className="text-slate-500">{program.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {program.category}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {program.duration}
                  </td>

                  <td className="px-6 py-5 font-semibold text-blue-600">
                    {program.price}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {program.branch.name}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <Link
  href={`/admin/program/${program.id}/edit`}
  className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-100"
>
  Edit
</Link>

<DeleteProgramButton id={program.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {programs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    Belum ada program.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Data program sekarang diambil dari PostgreSQL.
        </p>
      </div>
    </main>
  );
}