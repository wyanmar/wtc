import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, address, notes, branchSlug, programSlug } = body;

    if (!name || !phone || !address || !branchSlug || !programSlug) {
      return NextResponse.json(
        { message: "Data wajib belum lengkap." },
        { status: 400 }
      );
    }

    const branch = await prisma.branch.findUnique({
      where: { slug: branchSlug },
    });

    const program = await prisma.program.findUnique({
      where: { slug: programSlug },
    });

    if (!branch || !program) {
      return NextResponse.json(
        { message: "Cabang atau program tidak ditemukan." },
        { status: 404 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        name,
        phone,
        address,
        notes,
        branchId: branch.id,
        programId: program.id,
      },
    });

    return NextResponse.json(
      {
        message: "Pendaftaran berhasil disimpan.",
        data: registration,
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