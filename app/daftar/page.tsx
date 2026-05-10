import { prisma } from "@/lib/prisma";
import RegistrationForm from "@/components/RegistrationForm";

export const metadata = {
  title: "Pendaftaran Online",
  description: "Form pendaftaran online peserta pelatihan kerja di LPK.",
};

export default async function DaftarPage() {
  const branches = await prisma.branch.findMany({
    orderBy: { createdAt: "asc" },
  });

  const programs = await prisma.program.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/60">
      <section className="relative overflow-hidden py-20">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="font-semibold text-blue-600">Pendaftaran Online</p>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-900">
              Daftar Program Pelatihan Sesuai Cabang Terdekat
            </h1>

            <p className="mt-6 leading-8 text-slate-600">
              Isi formulir berikut untuk mengajukan pendaftaran. Admin cabang
              akan menghubungi Anda untuk konfirmasi jadwal, program, dan
              persyaratan pelatihan.
            </p>

            <div className="mt-10 grid gap-4">
              {[
                "Pilih cabang pelatihan",
                "Pilih program yang diminati",
                "Isi data diri peserta",
                "Admin akan melakukan konfirmasi",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                    {index + 1}
                  </div>

                  <p className="font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/80 bg-white/85 p-8 shadow-2xl backdrop-blur">
            <h2 className="text-3xl font-bold text-slate-900">
              Form Pendaftaran
            </h2>

            <p className="mt-3 text-slate-600">
              Lengkapi data berikut dengan benar.
            </p>

            <RegistrationForm branches={branches} programs={programs} />
          </div>
        </div>
      </section>
    </main>
  );
}