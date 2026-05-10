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
      return NextResponse.json({ message: "Belum login." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const { title, label, description, buttonText, branchId } = body;

    if (!title || !label || !description || !buttonText) {
      return NextResponse.json(
        { message: "Data promo belum lengkap." },
        { status: 400 }
      );
    }

    const promo = await prisma.promotion.findUnique({
      where: { id: Number(id) },
    });

    if (!promo) {
      return NextResponse.json(
        { message: "Promo tidak ditemukan." },
        { status: 404 }
      );
    }

    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== promo.branchId
    ) {
      return NextResponse.json(
        { message: "Tidak boleh mengedit promo cabang lain." },
        { status: 403 }
      );
    }

    const finalBranchId =
      session.role === "ADMIN_CABANG" ? promo.branchId : Number(branchId);

    if (!finalBranchId) {
      return NextResponse.json(
        { message: "Cabang wajib dipilih." },
        { status: 400 }
      );
    }

    const updatedPromo = await prisma.promotion.update({
      where: { id: Number(id) },
      data: {
        title,
        label,
        description,
        buttonText,
        branchId: finalBranchId,
      },
    });

    return NextResponse.json({
      message: "Promo berhasil diperbarui.",
      data: updatedPromo,
    });
  } catch (error) {
    console.error("UPDATE PROMO ERROR:", error);

    return NextResponse.json(
      { message: "Gagal memperbarui promo." },
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

    const promo = await prisma.promotion.findUnique({
      where: { id: Number(id) },
    });

    if (!promo) {
      return NextResponse.json(
        { message: "Promo tidak ditemukan." },
        { status: 404 }
      );
    }

    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== promo.branchId
    ) {
      return NextResponse.json(
        { message: "Tidak boleh menghapus promo cabang lain." },
        { status: 403 }
      );
    }

    await prisma.promotion.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Promo berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE PROMO ERROR:", error);

    return NextResponse.json(
      { message: "Gagal menghapus promo." },
      { status: 500 }
    );
  }
}