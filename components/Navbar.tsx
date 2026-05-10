"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menus = [
  { label: "Home", href: "/" },
  { label: "Program", href: "/program" },
  { label: "Cabang", href: "/cabang" },
  { label: "Blog", href: "/blog" },
  { label: "Galeri", href: "/galeri" },
  { label: "Pendaftaran", href: "/daftar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-sm">
            <img
              src="/logo/logo-wtc.webp"
              alt="Logo LPK"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">LPK WTC BALI</p>
            <p className="text-xs text-slate-400">Training & Development</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`text-sm font-medium transition ${
                pathname === menu.href
                  ? "text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {menu.label}
            </Link>
          ))}

         {/*  <Link
            href="/admin/login"
            className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
          >
            Admin
          </Link> */}

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
          >
            WhatsApp
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white md:hidden"
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <div className="grid gap-2 px-6 py-5">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {menu.label}
              </Link>
            ))}

            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Admin Panel
            </Link>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}