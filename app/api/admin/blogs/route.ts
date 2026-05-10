import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ message: "Belum login." }, { status: 401 });
    }

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

    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { message: "Slug blog sudah digunakan." },
        { status: 409 }
      );
    }

    const finalBranchId =
      session.role === "ADMIN_CABANG"
        ? session.branchId
        : branchId
          ? Number(branchId)
          : null;

    const blog = await prisma.blog.create({
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

    return NextResponse.json(
      {
        message: "Blog berhasil dibuat.",
        data: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return NextResponse.json(
      { message: "Gagal membuat blog." },
      { status: 500 }
    );
  }
}