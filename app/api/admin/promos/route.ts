import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { message: "Belum login." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { title, label, description, buttonText, branchId } = body;

    if (!title || !label || !description || !buttonText) {
      return NextResponse.json(
        { message: "Data promo belum lengkap." },
        { status: 400 }
      );
    }

    const finalBranchId =
      session.role === "ADMIN_CABANG"
        ? session.branchId
        : Number(branchId);

    if (!finalBranchId) {
      return NextResponse.json(
        { message: "Cabang wajib dipilih." },
        { status: 400 }
      );
    }

    const promo = await prisma.promotion.create({
      data: {
        title,
        label,
        description,
        buttonText,
        branchId: finalBranchId,
      },
    });

    return NextResponse.json(
      {
        message: "Promo berhasil dibuat.",
        data: promo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PROMO ERROR:", error);

    return NextResponse.json(
      { message: "Gagal membuat promo." },
      { status: 500 }
    );
  }
}