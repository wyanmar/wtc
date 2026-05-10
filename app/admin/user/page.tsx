import { prisma } from "@/lib/prisma";
import CreateAdminForm from "@/components/CreateAdminForm";

export default async function AdminUserPage() {
  const users = await prisma.user.findMany({
    include: {
      branch: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const branches = await prisma.branch.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="font-semibold text-blue-600">User Admin</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Kelola Akun Admin
          </h1>

          <p className="mt-2 text-slate-500">
            Daftar akun super admin, admin pusat, dan admin cabang.
          </p>
        </div>

        <CreateAdminForm branches={branches} />

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Cabang</th>
                <th className="px-6 py-4">Tanggal Dibuat</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-100">
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">{user.name}</p>
                    <p className="text-slate-500">{user.email}</p>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {user.branch?.name || "Semua Cabang"}
                  </td>

                  <td className="px-6 py-5 text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-100">
                        Edit
                      </button>

                      <button className="rounded-xl bg-red-50 px-4 py-2 font-semibold text-red-600 hover:bg-red-100">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    Belum ada akun admin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Halaman ini hanya boleh diakses oleh SUPER_ADMIN.
        </p>
      </div>
    </main>
  );
}