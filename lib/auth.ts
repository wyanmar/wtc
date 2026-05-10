import { cookies } from "next/headers";

export type AdminSession = {
  id: number;
  name: string;
  email: string;
  role: string;
  branchId: number | null;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();

  const session = cookieStore.get("admin_session");

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}