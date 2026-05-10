import AdminLogoutButton from "@/components/AdminLogoutButton";

type Props = {
  name: string;
  role: string;
};

export default function AdminTopbar({ name, role }: Props) {
  return (
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-600">Admin Panel</p>
          <h2 className="text-xl font-bold text-slate-900">
            Kelola Website LPK
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-slate-50 px-5 py-3">
            <p className="text-sm text-slate-500">Login sebagai</p>
            <p className="font-bold text-slate-900">{name}</p>
            <p className="text-xs text-slate-500">{role}</p>
          </div>

          <AdminLogoutButton />
        </div>
      </div>
    </div>
  );
}