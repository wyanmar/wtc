import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import CreateBlogForm from "@/components/CreateBlogForm";
import DeleteBlogButton from "@/components/DeleteBlogButton";

export default async function AdminBlogPage() {
  const session = await getAdminSession();

  const branches = await prisma.branch.findMany({
    orderBy: { name: "asc" },
  });

  const blogs = await prisma.blog.findMany({
    where:
      session?.role === "ADMIN_CABANG" && session?.branchId
        ? { branchId: session.branchId }
        : {},
    include: {
      branch: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="font-semibold text-blue-600">Admin Blog</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Kelola Blog & Informasi
          </h1>

          <p className="mt-2 text-slate-500">
            Admin cabang hanya mengelola blog cabangnya sendiri.
          </p>
        </div>

        <CreateBlogForm
          branches={branches}
          role={session?.role || "ADMIN_CABANG"}
        />

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Artikel</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Cabang</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-t border-slate-100">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-14 w-14 rounded-2xl object-cover"
                      />

                      <div>
                        <p className="font-bold text-slate-900">
                          {blog.title}
                        </p>
                        <p className="text-slate-500">{blog.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {blog.category}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {blog.branch?.name || "Global"}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {blog.date}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/blog/${blog.id}/edit`}
                        className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-100"
                      >
                        Edit
                      </Link>

                      <DeleteBlogButton id={blog.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {blogs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    Belum ada artikel blog.
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