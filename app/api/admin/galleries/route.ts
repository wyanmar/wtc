import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { generateSlug } from "@/lib/slug";

export async function GET() {
  try {
    const user = await getAdminSession();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const where =
      user.role === "ADMIN_CABANG"
        ? { branchId: user.branchId }
        : {};

    const galleries = await prisma.gallery.findMany({
      where,
      include: {
        branch: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(galleries);
  } catch (error) {
    console.error("GET GALLERIES ERROR:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data galeri" },
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

    const { title, description, imageUrl, branchId, isActive } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { message: "Judul dan gambar wajib diisi" },
        { status: 400 }
      );
    }

    let finalBranchId = branchId ? Number(branchId) : null;

if (user.role === "ADMIN_CABANG") {
  finalBranchId = user.branchId ? Number(user.branchId) : null;
}

    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.gallery.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const gallery = await prisma.gallery.create({
      data: {
        title,
        slug,
        description,
        imageUrl,
        branchId: finalBranchId,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    console.error("CREATE GALLERY ERROR:", error);
    return NextResponse.json(
      { message: "Gagal membuat galeri" },
      { status: 500 }
    );
  }
}