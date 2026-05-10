import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

import CreateHeroForm from "@/components/CreateHeroForm";

export default async function CreateHeroPage() {
  const user = await getAdminSession();

  if (!user) {
    return null;
  }

  const branches = await prisma.branch.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href="/admin/hero"
          className="text-sm font-semibold text-blue-600"
        >
          ← Kembali
        </Link>

        <h1 className="mt-4 text-4xl font-black text-slate-900">
          Tambah Hero Banner
        </h1>
      </div>

      <CreateHeroForm
        branches={branches}
        userRole={user.role}
        userBranchId={user.branchId}
      />
    </div>
  );
}