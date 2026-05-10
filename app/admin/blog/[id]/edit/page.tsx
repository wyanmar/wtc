import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import EditBlogForm from "@/components/EditBlogForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPage({ params }: Props) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const blog = await prisma.blog.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!blog) {
    notFound();
  }

  if (
    session.role === "ADMIN_CABANG" &&
    session.branchId !== blog.branchId
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
        <p className="font-semibold text-blue-600">Edit Blog</p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          {blog.title}
        </h1>

        <p className="mt-2 text-slate-500">
          Perbarui artikel, gambar, ringkasan, cabang, dan isi blog.
        </p>

        <EditBlogForm
          blog={blog}
          branches={branches}
          role={session.role}
        />
      </div>
    </main>
  );
}