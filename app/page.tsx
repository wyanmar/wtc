import HomeContent from "@/components/HomeContent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const branches = await prisma.branch.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const blogs = await prisma.blog.findMany({
    take: 3,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return <HomeContent branches={branches} blogs={blogs} />;
}