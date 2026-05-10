import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
        <AdminSidebar role={session.role} />

        <div className="min-w-0">
          <AdminTopbar name={session.name} role={session.role} />

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}