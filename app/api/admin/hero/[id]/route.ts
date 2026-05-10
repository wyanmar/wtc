import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_req: Request, { params }: Params) {
  try {
    const user = await getAdminSession();
    const { id } = await params;

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const heroBanner = await prisma.heroBanner.findUnique({
      where: { id: Number(id) },
      include: { branch: true },
    });

    if (!heroBanner) {
      return NextResponse.json(
        { message: "Hero banner tidak ditemukan" },
        { status: 404 }
      );
    }

    if (
      user.role === "ADMIN_CABANG" &&
      heroBanner.branchId !== Number(user.branchId)
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(heroBanner);
  } catch (error) {
    console.error("GET HERO DETAIL ERROR:", error);
    return NextResponse.json(
      { message: "Gagal mengambil detail hero banner" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const user = await getAdminSession();
    const { id } = await params;

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.heroBanner.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Hero banner tidak ditemukan" },
        { status: 404 }
      );
    }

    if (
      user.role === "ADMIN_CABANG" &&
      existing.branchId !== Number(user.branchId)
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const {
      title,
      subtitle,
      description,
      imageUrl,
      buttonText,
      buttonLink,
      branchId,
      isActive,
      sortOrder,
    } = body;

    if (!title || !subtitle || !description || !imageUrl) {
      return NextResponse.json(
        { message: "Judul, subtitle, deskripsi, dan gambar wajib diisi" },
        { status: 400 }
      );
    }

    let finalBranchId = branchId ? Number(branchId) : null;

    if (user.role === "ADMIN_CABANG") {
      finalBranchId = user.branchId ? Number(user.branchId) : null;
    }

    const heroBanner = await prisma.heroBanner.update({
      where: { id: Number(id) },
      data: {
        title,
        subtitle,
        description,
        imageUrl,
        buttonText: buttonText || null,
        buttonLink: buttonLink || null,
        branchId: finalBranchId,
        isActive: Boolean(isActive),
        sortOrder: sortOrder ? Number(sortOrder) : 0,
      },
    });

    return NextResponse.json(heroBanner);
  } catch (error) {
    console.error("UPDATE HERO ERROR:", error);
    return NextResponse.json(
      { message: "Gagal update hero banner" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await getAdminSession();
    const { id } = await params;

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.heroBanner.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Hero banner tidak ditemukan" },
        { status: 404 }
      );
    }

    if (
      user.role === "ADMIN_CABANG" &&
      existing.branchId !== Number(user.branchId)
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.heroBanner.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Hero banner berhasil dihapus" });
  } catch (error) {
    console.error("DELETE HERO ERROR:", error);
    return NextResponse.json(
      { message: "Gagal menghapus hero banner" },
      { status: 500 }
    );
  }
}