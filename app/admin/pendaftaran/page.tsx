import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import UpdateStatus from "@/components/UpdateStatus";
import UpdateFollowUpNote from "@/components/UpdateFollowUpNote";
import RegistrationStatusFilter from "@/components/RegistrationStatusFilter";

type Props = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function AdminPendaftaranPage({
  searchParams,
}: Props) {
  const session = await getAdminSession();
  const params = await searchParams;
  const selectedStatus = params.status;

  const registrations = await prisma.registration.findMany({
    where: {
      ...(session?.role === "ADMIN_CABANG" && session?.branchId
        ? { branchId: session.branchId }
        : {}),
      ...(selectedStatus && selectedStatus !== "SEMUA"
        ? { status: selectedStatus as any }
        : {}),
    },
    include: {
      branch: true,
      program: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-blue-600">
              Admin Pendaftaran
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Data Pendaftaran Peserta
            </h1>

            <p className="mt-2 text-slate-500">
              Total {registrations.length} pendaftaran ditampilkan.
            </p>
          </div>

          <a
            href="/api/admin/registrations/export"
            className="rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            Export CSV
          </a>
        </div>

        <RegistrationStatusFilter />

        <div className="mt-8 overflow-x-auto rounded-3xl bg-blue shadow-sm">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Peserta</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Cabang</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Follow Up</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {registrations.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">
                      {item.name}
                    </p>

                    <p className="text-slate-500">
                      {item.phone}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.address}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {item.program.title}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {item.branch.name}
                  </td>

                  <td className="px-6 py-5">
                    <UpdateStatus
                      id={item.id}
                      currentStatus={item.status}
                    />
                  </td>

                  <td className="px-6 py-5 text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <UpdateFollowUpNote
                      id={item.id}
                      currentNote={item.followUpNote}
                      currentStatus={item.status}
                    />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`https://wa.me/${item.phone}`}
                        target="_blank"
                        className="rounded-xl bg-green-50 px-4 py-2 font-semibold text-green-600 hover:bg-green-100"
                      >
                        WhatsApp
                      </a>

                      <Link
                        href={`/admin/pendaftaran/${item.id}`}
                        className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-100"
                      >
                        Detail
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {registrations.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    Belum ada data pendaftaran untuk filter ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}