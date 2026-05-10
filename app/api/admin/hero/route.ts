import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAdminSession();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const where =
      user.role === "ADMIN_CABANG"
        ? { branchId: user.branchId ? Number(user.branchId) : null }
        : {};

    const heroBanners = await prisma.heroBanner.findMany({
      where,
      include: {
        branch: true,
      },
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(heroBanners);
  } catch (error) {
    console.error("GET HERO ERROR:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data hero" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAdminSession();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

    const heroBanner = await prisma.heroBanner.create({
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

    return NextResponse.json(heroBanner, { status: 201 });
  } catch (error) {
    console.error("CREATE HERO ERROR:", error);
    return NextResponse.json(
      { message: "Gagal membuat hero banner" },
      { status: 500 }
    );
  }
}