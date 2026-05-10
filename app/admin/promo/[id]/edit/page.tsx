import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import EditPromoForm from "@/components/EditPromoForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPromoPage({ params }: Props) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const promo = await prisma.promotion.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!promo) {
    notFound();
  }

  if (
    session.role === "ADMIN_CABANG" &&
    session.branchId !== promo.branchId
  ) {
    notFound();
  }

  const branches = await prisma.branch.findMany({
    where:
      session.role === "ADMIN_CABANG" && session.branchId
        ? {
            id: session.branchId,
          }
        : {},
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <p className="font-semibold text-blue-600">Edit Promo</p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          {promo.title}
        </h1>

        <p className="mt-2 text-slate-500">
          Perbarui informasi promo cabang.
        </p>

        <EditPromoForm
          promo={promo}
          branches={branches}
          role={session.role}
        />
      </div>
    </main>
  );
}