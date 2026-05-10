import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import EditTestimonialForm from "@/components/EditTestimonialForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTestimoniPage({ params }: Props) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const testimonial = await prisma.testimonial.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!testimonial) {
    notFound();
  }

  if (
    session.role === "ADMIN_CABANG" &&
    session.branchId !== testimonial.branchId
  ) {
    notFound();
  }

  const branches = await prisma.branch.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <p className="font-semibold text-blue-600">Edit Testimoni</p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          {testimonial.name}
        </h1>

        <p className="mt-2 text-slate-500">
          Perbarui data testimoni peserta atau alumni.
        </p>

        <EditTestimonialForm
          testimonial={testimonial}
          branches={branches}
          role={session.role}
        />
      </div>
    </main>
  );
}