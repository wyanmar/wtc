import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import CreatePromoForm from "@/components/CreatePromoForm";
import DeletePromoButton from "@/components/DeletePromoButton";
import Link from "next/link";

export default async function AdminPromoPage() {
  const session = await getAdminSession();

  const branches = await prisma.branch.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const promos = await prisma.promotion.findMany({
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
          <p className="font-semibold text-blue-600">Admin Promo</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Kelola Promo Cabang
          </h1>

          <p className="mt-2 text-slate-500">
            Tambahkan dan kelola penawaran khusus untuk setiap cabang.
          </p>
        </div>

        <CreatePromoForm
          branches={branches}
          role={session?.role || "ADMIN_CABANG"}
        />

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Promo</th>
                <th className="px-6 py-4">Label</th>
                <th className="px-6 py-4">Cabang</th>
                <th className="px-6 py-4">Tombol</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {promos.map((promo) => (
                <tr key={promo.id} className="border-t border-slate-100">
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">
                      {promo.title}
                    </p>

                    <p className="mt-1 max-w-md text-slate-500">
                      {promo.description}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {promo.label}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {promo.branch.name}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {promo.buttonText}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <Link
  href={`/admin/promo/${promo.id}/edit`}
  className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-100"
>
  Edit
</Link>

                      <DeletePromoButton id={promo.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {promos.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    Belum ada promo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Data promo sekarang tersimpan di PostgreSQL.
        </p>
      </div>
    </main>
  );
}