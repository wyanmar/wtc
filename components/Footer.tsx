import Link from "next/link";
import { branches } from "@/data/branches";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        
        {/* Logo & Deskripsi */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-500/40 p-2 shadow-sm">
              <img
                src="/logo/logo-wtc.webp"
                alt="Logo LPK"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h2 className="font-bold">LPK WTC BALI</h2>
              <p className="text-sm text-slate-400">Training & Development</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-400">
            Lembaga pelatihan kerja profesional dengan berbagai program pelatihan dan pengembangan skill kerja modern.
          </p>
        </div>

        {/* Link */}
        <div>
          <h3 className="font-semibold text-white">Link</h3>
          <div className="mt-6 flex flex-col gap-4 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/program" className="hover:text-white">Program</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/galeri" className="hover:text-white">Galeri</Link>
            <Link href="/daftar" className="hover:text-white">Pendaftaran</Link>

 
          </div>
        </div>

        {/* Cabang Kami */}
        <div>
          <h3 className="font-semibold text-white">Cabang Kami</h3>
          <div className="mt-6 flex flex-col gap-4 text-sm text-slate-400">
            {branches.map((branch) => (
              <Link
                key={branch.id}
                href={`/cabang/${branch.slug}`}
                className="hover:text-white"
              >
                {branch.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Kontak Pusat */}
        <div>
          <h3 className="font-semibold text-white">Kontak Pusat</h3>
          <div className="mt-6 space-y-4 text-sm text-slate-400">
            <p>Jl. Kantor Pusat No. 1</p>
            <p>info@lpkindonesia.com</p>
            <p>+62 812 3456 7890</p>
          </div>
                     {/* Admin Panel */}
            <div className="mt-4 border-t border-gray-700 pt-2">
  <Link
    href="/admin/login"
    className="text-xs font-normal text-gray-600 hover:text-gray-500"
  >
    Admin Panel
  </Link>
</div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © 2026 LPK Indonesia. All rights reserved.
      </div>
    </footer>
  );
}