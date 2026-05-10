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

    let finalBranchId = Number(branchId);

    if (session.role === "ADMIN_CABANG") {
      if (!session.branchId) {
        return NextResponse.json(
          { message: "Admin cabang belum terhubung ke cabang." },
          { status: 403 }
        );
      }

      finalBranchId = session.branchId;
    }

    if (!finalBranchId) {
      return NextResponse.json(
        { message: "Cabang wajib dipilih." },
        { status: 400 }
      );
    }

    const existingProgram = await prisma.program.findUnique({
      where: {
        slug,
      },
    });

    if (existingProgram) {
      return NextResponse.json(
        { message: "Slug program sudah digunakan." },
        { status: 409 }
      );
    }

    const program = await prisma.program.create({
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

    return NextResponse.json(
      {
        message: "Program berhasil dibuat.",
        data: program,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}