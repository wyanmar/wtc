import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ message: "Belum login." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      category,
      date,
      image,
      excerpt,
      content,
      branchId,
    } = body;

    if (!title || !slug || !category || !date || !image || !excerpt || !content) {
      return NextResponse.json(
        { message: "Data blog belum lengkap." },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog tidak ditemukan." },
        { status: 404 }
      );
    }

    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== blog.branchId
    ) {
      return NextResponse.json(
        { message: "Tidak boleh mengedit blog cabang lain." },
        { status: 403 }
      );
    }

    const existingSlug = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingSlug && existingSlug.id !== blog.id) {
      return NextResponse.json(
        { message: "Slug blog sudah digunakan artikel lain." },
        { status: 409 }
      );
    }

    const finalBranchId =
      session.role === "ADMIN_CABANG"
        ? blog.branchId
        : branchId
          ? Number(branchId)
          : null;

    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: {
        title,
        slug,
        category,
        date,
        image,
        excerpt,
        content,
        branchId: finalBranchId,
      },
    });

    return NextResponse.json({
      message: "Blog berhasil diperbarui.",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    return NextResponse.json(
      { message: "Gagal memperbarui blog." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ message: "Belum login." }, { status: 401 });
    }

    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog tidak ditemukan." },
        { status: 404 }
      );
    }

    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== blog.branchId
    ) {
      return NextResponse.json(
        { message: "Tidak boleh menghapus blog cabang lain." },
        { status: 403 }
      );
    }

    await prisma.blog.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Blog berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);

    return NextResponse.json(
      { message: "Gagal menghapus blog." },
      { status: 500 }
    );
  }
}