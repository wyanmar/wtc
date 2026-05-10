import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const registrations = await prisma.registration.findMany({
      where:
        session.role === "ADMIN_CABANG" && session.branchId
          ? {
              branchId: session.branchId,
            }
          : {},
      include: {
        branch: true,
        program: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const headers = [
      "Nama",
      "Telepon",
      "Alamat",
      "Program",
      "Cabang",
      "Status",
      "Catatan",
      "Tanggal",
    ];

    const rows = registrations.map((item) => [
      item.name,
      item.phone,
      item.address,
      item.program.title,
      item.branch.name,
      item.status,
      item.notes || "",
      new Date(item.createdAt).toLocaleString("id-ID"),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="pendaftaran-lpk.csv"',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Gagal export data", {
      status: 500,
    });
  }
}