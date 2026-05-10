import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata = {
  title: "Login Admin",
  description: "Halaman login admin LPK.",
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2">
          <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-600/40 to-cyan-500/30 p-12 text-white md:flex">
            <div>
              <p className="text-sm font-semibold text-cyan-200">
                Admin Panel
              </p>

              <h1 className="mt-4 text-5xl font-bold leading-tight">
                Kelola Website LPK Multi Cabang
              </h1>

              <p className="mt-6 leading-8 text-blue-100">
                Admin pusat dan admin cabang dapat mengelola informasi,
                program, promo, jadwal, galeri, blog, dan data pendaftaran.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "Kelola konten cabang",
                "Pantau pendaftaran peserta",
                "Update program dan promosi",
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 md:p-12">
            <div className="mx-auto max-w-md">
              <div className="mb-10">
                <p className="font-semibold text-blue-600">Login Admin</p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  Masuk ke Dashboard
                </h2>

                <p className="mt-4 text-slate-600">
                  Gunakan akun admin yang telah diberikan untuk mengakses panel
                  pengelolaan website.
                </p>
              </div>

              <AdminLoginForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}