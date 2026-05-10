import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { generateSlug } from "@/lib/slug";

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

    const gallery = await prisma.gallery.findUnique({
      where: { id },
      include: { branch: true },
    });

    if (!gallery) {
      return NextResponse.json(
        { message: "Galeri tidak ditemukan" },
        { status: 404 }
      );
    }

    if (user.role === "ADMIN_CABANG" && gallery.branchId !== user.branchId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("GET GALLERY ERROR:", error);
    return NextResponse.json(
      { message: "Gagal mengambil detail galeri" },
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

    const existing = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Galeri tidak ditemukan" },
        { status: 404 }
      );
    }

    if (user.role === "ADMIN_CABANG" && existing.branchId !== user.branchId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
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

    let slug = existing.slug;

    if (title !== existing.title) {
      const baseSlug = generateSlug(title);
      slug = baseSlug;
      let counter = 1;

      while (
        await prisma.gallery.findFirst({
          where: {
            slug,
            NOT: { id },
          },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const gallery = await prisma.gallery.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        imageUrl,
        branchId: finalBranchId,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("UPDATE GALLERY ERROR:", error);
    return NextResponse.json(
      { message: "Gagal update galeri" },
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

    const existing = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Galeri tidak ditemukan" },
        { status: 404 }
      );
    }

    if (user.role === "ADMIN_CABANG" && existing.branchId !== user.branchId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.gallery.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Galeri berhasil dihapus" });
  } catch (error) {
    console.error("DELETE GALLERY ERROR:", error);
    return NextResponse.json(
      { message: "Gagal menghapus galeri" },
      { status: 500 }
    );
  }
}
