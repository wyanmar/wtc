import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import EditProgramForm from "@/components/EditProgramForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProgramPage({ params }: Props) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const program = await prisma.program.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!program) {
    notFound();
  }

  if (
    session.role === "ADMIN_CABANG" &&
    session.branchId !== program.branchId
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
        <div>
          <p className="font-semibold text-blue-600">Edit Program</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {program.title}
          </h1>

          <p className="mt-2 text-slate-500">
            Perbarui informasi program pelatihan.
          </p>
        </div>

        <EditProgramForm
          program={program}
          branches={branches}
          role={session.role}
        />
      </div>
    </main>
  );
}