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

    const { name, job, image, rating, message, branchId } = body;

    if (!name || !job || !image || !rating || !message) {
      return NextResponse.json(
        { message: "Data testimoni belum lengkap." },
        { status: 400 }
      );
    }

    const finalBranchId =
      session.role === "ADMIN_CABANG"
        ? session.branchId
        : branchId
          ? Number(branchId)
          : null;

    if (!finalBranchId) {
      return NextResponse.json(
        { message: "Cabang wajib dipilih." },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        job,
        image,
        rating: Number(rating),
        message,
        branchId: finalBranchId,
      },
    });

    return NextResponse.json(
      {
        message: "Testimoni berhasil dibuat.",
        data: testimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE TESTIMONIAL ERROR:", error);

    return NextResponse.json(
      { message: "Gagal membuat testimoni." },
      { status: 500 }
    );
  }
}