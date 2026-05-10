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
      return NextResponse.json(
        { message: "Belum login." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const { status, followUpNote } = body;

    const registration = await prisma.registration.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!registration) {
      return NextResponse.json(
        { message: "Data pendaftaran tidak ditemukan." },
        { status: 404 }
      );
    }

    if (
      session.role === "ADMIN_CABANG" &&
      session.branchId !== registration.branchId
    ) {
      return NextResponse.json(
        { message: "Tidak boleh mengubah data cabang lain." },
        { status: 403 }
      );
    }

    const updatedRegistration = await prisma.registration.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(status ? { status } : {}),
        ...(followUpNote !== undefined ? { followUpNote } : {}),
      },
    });

    return NextResponse.json({
      message: "Data pendaftaran berhasil diperbarui.",
      data: updatedRegistration,
    });
  } catch (error) {
    console.error("UPDATE REGISTRATION ERROR:", error);

    return NextResponse.json(
      { message: "Gagal update data pendaftaran." },
      { status: 500 }
    );
  }
}