import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: Props
) {
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

    // ADMIN CABANG hanya boleh edit program miliknya
    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== program.branchId
    ) {
      return NextResponse.json(
        {
          message:
            "Tidak boleh mengedit program cabang lain.",
        },
        { status: 403 }
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
        branchId:
          session.role === "ADMIN_CABANG"
            ? program.branchId
            : Number(branchId),
      },
    });

    return NextResponse.json({
      message: "Program berhasil diperbarui.",
      data: updatedProgram,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal memperbarui program.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Props
) {
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

    // ADMIN CABANG hanya boleh hapus program miliknya
    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== program.branchId
    ) {
      return NextResponse.json(
        {
          message:
            "Tidak boleh menghapus program cabang lain.",
        },
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
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal menghapus program.",
      },
      { status: 500 }
    );
  }
}