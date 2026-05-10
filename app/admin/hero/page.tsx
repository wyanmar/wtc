import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

import DeleteHeroButton from "@/components/DeleteHeroButton";

export default async function HeroAdminPage() {
  const user = await getAdminSession();

  if (!user) {
    return null;
  }

  const where =
    user.role === "ADMIN_CABANG"
      ? {
          branchId: user.branchId,
        }
      : {};

  const heroBanners = await prisma.heroBanner.findMany({
    where,
    include: {
      branch: true,
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between rounded-[32px] bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">
            Homepage CMS
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Hero Banner
          </h1>
        </div>

        <Link
          href="/admin/hero/create"
          className="rounded-2xl bg-white px-5 py-3 font-bold text-blue-600 shadow-lg"
        >
          + Tambah Hero
        </Link>
      </div>

      <div className="grid gap-6">
        {heroBanners.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-[32px] bg-white shadow-xl"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-[280px]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between p-8">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    {item.branch?.name || "Homepage Utama"}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {item.title}
                  </h2>

                  <p className="mt-4 text-slate-600">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 flex gap-4">
                  <Link
                    href={`/admin/hero/${item.id}/edit`}
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                  >
                    Edit
                  </Link>

                  <DeleteHeroButton id={item.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {heroBanners.length === 0 && (
        <div className="rounded-[32px] bg-white p-10 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Hero belum tersedia
          </h2>

          <p className="mt-3 text-slate-500">
            Tambahkan hero pertama untuk homepage.
          </p>
        </div>
      )}
    </div>
  );
}