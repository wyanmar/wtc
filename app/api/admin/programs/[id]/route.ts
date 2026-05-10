import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: Props) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { message: "Belum login." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      category,
      duration,
      price,
      image,
      description,
      branchId,
    } = body;

    if (
      !title ||
      !slug ||
      !category ||
      !duration ||
      !price ||
      !image ||
      !description
    ) {
      return NextResponse.json(
        { message: "Data program belum lengkap." },
        { status: 400 }
      );
    }

    const program = await prisma.program.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!program) {
      return NextResponse.json(
        { message: "Program tidak ditemukan." },
        { status: 404 }
      );
    }

    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== program.branchId
    ) {
      return NextResponse.json(
        { message: "Tidak boleh mengedit program cabang lain." },
        { status: 403 }
      );
    }

    const finalBranchId =
      session.role === "ADMIN_CABANG"
        ? program.branchId
        : Number(branchId);

    if (!finalBranchId) {
      return NextResponse.json(
        { message: "Cabang wajib dipilih." },
        { status: 400 }
      );
    }

    const existingSlug = await prisma.program.findUnique({
      where: {
        slug,
      },
    });

    if (existingSlug && existingSlug.id !== program.id) {
      return NextResponse.json(
        { message: "Slug program sudah digunakan program lain." },
        { status: 409 }
      );
    }

    const updatedProgram = await prisma.program.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        slug,
        category,
        duration,
        price,
        image,
        description,
        branchId: finalBranchId,
      },
    });

    return NextResponse.json({
      message: "Program berhasil diperbarui.",
      data: updatedProgram,
    });
  } catch (error) {
    console.error("UPDATE PROGRAM ERROR:", error);

    return NextResponse.json(
      { message: "Gagal memperbarui program. Cek terminal untuk detail error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { message: "Belum login." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const program = await prisma.program.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!program) {
      return NextResponse.json(
        { message: "Program tidak ditemukan." },
        { status: 404 }
      );
    }

    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== program.branchId
    ) {
      return NextResponse.json(
        { message: "Tidak boleh menghapus program cabang lain." },
        { status: 403 }
      );
    }

    await prisma.program.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Program berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE PROGRAM ERROR:", error);

    return NextResponse.json(
      { message: "Gagal menghapus program." },
      { status: 500 }
    );
  }
}