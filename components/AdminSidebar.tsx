"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  role: string;
};

const menuByRole = {
  SUPER_ADMIN: [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Program", href: "/admin/program" },
    { label: "Promo", href: "/admin/promo" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Galeri", href: "/admin/galeri" },
    { label: "Testimoni", href: "/admin/testimoni" },
    { label: "Hero", href: "/admin/hero" },
    { label: "Pendaftaran", href: "/admin/pendaftaran" },
    { label: "User Admin", href: "/admin/user" },
    
  ],
  ADMIN_PUSAT: [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Program", href: "/admin/program" },
    { label: "Promo", href: "/admin/promo" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Galeri", href: "/admin/galeri" },
    { label: "Testimoni", href: "/admin/testimoni" },
    { label: "Hero", href: "/admin/hero" },
    { label: "Pendaftaran", href: "/admin/pendaftaran" },
  ],
  ADMIN_CABANG: [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Program", href: "/admin/program" },
    { label: "Promo", href: "/admin/promo" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Galeri", href: "/admin/galeri" },
    { label: "Testimoni", href: "/admin/testimoni" },
    { label: "Pendaftaran", href: "/admin/pendaftaran" },
  ],
};

export default function AdminSidebar({ role }: Props) {
  const pathname = usePathname();

  const menus =
    menuByRole[role as keyof typeof menuByRole] || menuByRole.ADMIN_CABANG;

  return (
    <aside className="hidden min-h-screen border-r border-slate-200 bg-slate-950 p-6 text-white md:block">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-bold">
          A
        </div>

        <div>
          <h1 className="font-bold">Admin LPK</h1>
          <p className="text-sm text-slate-400">Multi Branch CMS</p>
        </div>
      </div>

      <nav className="mt-10 grid gap-2">
        {menus.map((menu) => {
          const active = pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {menu.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}