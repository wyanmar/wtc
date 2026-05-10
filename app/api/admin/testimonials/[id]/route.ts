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

    const { name, job, image, rating, message, branchId } = body;

    if (!name || !job || !image || !rating || !message) {
      return NextResponse.json(
        { message: "Data testimoni belum lengkap." },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimoni tidak ditemukan." },
        { status: 404 }
      );
    }

    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== testimonial.branchId
    ) {
      return NextResponse.json(
        { message: "Tidak boleh mengedit testimoni cabang lain." },
        { status: 403 }
      );
    }

    const finalBranchId =
      session.role === "ADMIN_CABANG"
        ? testimonial.branchId
        : Number(branchId);

    const updated = await prisma.testimonial.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        job,
        image,
        rating: Number(rating),
        message,
        branchId: finalBranchId,
      },
    });

    return NextResponse.json({
      message: "Testimoni berhasil diperbarui.",
      data: updated,
    });
  } catch (error) {
    console.error("UPDATE TESTIMONIAL ERROR:", error);

    return NextResponse.json(
      { message: "Gagal memperbarui testimoni." },
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

    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimoni tidak ditemukan." },
        { status: 404 }
      );
    }

    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== testimonial.branchId
    ) {
      return NextResponse.json(
        { message: "Tidak boleh menghapus testimoni cabang lain." },
        { status: 403 }
      );
    }

    await prisma.testimonial.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Testimoni berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE TESTIMONIAL ERROR:", error);

    return NextResponse.json(
      { message: "Gagal menghapus testimoni." },
      { status: 500 }
    );
  }
}