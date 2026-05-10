import { prisma } from "@/lib/prisma";
import ProgramContent from "@/components/ProgramContent";

export default async function ProgramPage() {
  const programs = await prisma.program.findMany({
    include: {
      branch: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const branches = await prisma.branch.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <ProgramContent programs={programs} branches={branches} />;
}