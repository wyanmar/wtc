import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import CreateTestimonialForm from "@/components/CreateTestimonialForm";
import DeleteTestimonialButton from "@/components/DeleteTestimonialButton";

export default async function AdminTestimoniPage() {
  const session = await getAdminSession();

  const branches = await prisma.branch.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const testimonials = await prisma.testimonial.findMany({
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
    <main className="p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="font-semibold text-blue-600">Admin Testimoni</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Kelola Testimoni
          </h1>

          <p className="mt-2 text-slate-500">
            Tambahkan testimoni alumni atau peserta berdasarkan cabang.
          </p>
        </div>

        <CreateTestimonialForm
          branches={branches}
          role={session?.role || "ADMIN_CABANG"}
        />

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Testimoni</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Cabang</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {testimonials.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 rounded-2xl object-cover"
                      />

                      <div>
                        <p className="font-bold text-slate-900">
                          {item.name}
                        </p>

                        <p className="text-slate-500">{item.job}</p>

                        <p className="mt-1 max-w-md text-sm text-slate-500">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-yellow-400">
                    {"★".repeat(item.rating)}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {item.branch.name}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/testimoni/${item.id}/edit`}
                        className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-100"
                      >
                        Edit
                      </Link>

                      <DeleteTestimonialButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {testimonials.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    Belum ada testimoni.
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