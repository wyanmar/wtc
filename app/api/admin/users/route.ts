import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();

    if (session?.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { message: "Akses ditolak." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const { name, email, password, role, branchId } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Data wajib belum lengkap." },
        { status: 400 }
      );
    }

    if (role === "ADMIN_CABANG" && !branchId) {
      return NextResponse.json(
        { message: "Admin cabang wajib memilih cabang." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah digunakan." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        branchId: role === "ADMIN_CABANG" ? Number(branchId) : null,
      },
    });

    return NextResponse.json(
      {
        message: "Admin berhasil dibuat.",
        user,
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