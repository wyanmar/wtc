import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailPendaftaranPage({ params }: Props) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const registration = await prisma.registration.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      branch: true,
      program: true,
    },
  });

  if (!registration) {
    notFound();
  }

  if (
    session.role === "ADMIN_CABANG" &&
    session.branchId !== registration.branchId
  ) {
    notFound();
  }

  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/pendaftaran"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Kembali ke Pendaftaran
        </Link>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <p className="font-semibold text-blue-600">Detail Pendaftaran</p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            {registration.name}
          </h1>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Info label="Nama Peserta" value={registration.name} />
            <Info label="Nomor WhatsApp" value={registration.phone} />
            <Info label="Alamat" value={registration.address} />
            <Info label="Cabang" value={registration.branch.name} />
            <Info label="Program" value={registration.program.title} />
            <Info label="Status" value={registration.status} />
            <Info
              label="Catatan Peserta"
              value={registration.notes || "-"}
            />
            <Info
              label="Catatan Follow Up Admin"
              value={registration.followUpNote || "-"}
            />
            <Info
              label="Tanggal Masuk"
              value={new Date(registration.createdAt).toLocaleString("id-ID")}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${registration.phone}`}
              target="_blank"
              className="rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700"
            >
              Hubungi WhatsApp
            </a>

            <Link
              href="/admin/pendaftaran"
              className="rounded-2xl bg-slate-200 px-6 py-4 font-semibold text-slate-700 hover:bg-slate-300"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 font-semibold leading-7 text-slate-900">{value}</p>
    </div>
  );
}