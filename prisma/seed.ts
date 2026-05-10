import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.branch.createMany({
    data: [
      {
        slug: "pusat",
        name: "Kantor Pusat WTC",
        city: "Karangasem",
        address: "Jl. Raya Karangasem No. 1",
        phone: "6281234567890",
        email: "pusat@wtc.com",
        image: "/images/cabang-pusat.jpg",
        maps: "https://maps.google.com",
        schedule: "Senin - Sabtu | 08:00 - 16:00",
        description: "Kantor pusat dan pusat koordinasi pelatihan kerja.",
      },
      {
        slug: "tianyar",
        name: "LPK WTC Tianyar",
        city: "Karangasem",
        address: "Jl. Tianyar Timur No. 12",
        phone: "6281234567891",
        email: "tianyar@wtc.com",
        image: "/images/cabang-tianyar.jpg",
        maps: "https://maps.google.com",
        schedule: "Senin - Jumat | 08:00 - 15:00",
        description: "Cabang Tianyar fokus pada hospitality dan tata boga.",
      },
      {
        slug: "singaraja",
        name: "LPK WTC Singaraja",
        city: "Buleleng",
        address: "Jl. Ahmad Yani Singaraja",
        phone: "6281234567892",
        email: "singaraja@wtc.com",
        image: "/images/cabang-singaraja.jpg",
        maps: "https://maps.google.com",
        schedule: "Senin - Sabtu | 09:00 - 17:00",
        description:
          "Cabang Singaraja menyediakan pelatihan komputer dan desain grafis.",
      },
      {
        slug: "denpasar",
        name: "LPK WTC Denpasar",
        city: "Denpasar",
        address: "Jl. Gatot Subroto Denpasar",
        phone: "6281234567893",
        email: "denpasar@wtc.com",
        image: "/images/cabang-denpasar.jpg",
        maps: "https://maps.google.com",
        schedule: "Senin - Jumat | 08:00 - 16:00",
        description:
          "Cabang Denpasar fokus pada digital skill dan pelatihan modern.",
      },
    ],
    skipDuplicates: true,
  });

  const pusat = await prisma.branch.findUnique({ where: { slug: "pusat" } });
  const tianyar = await prisma.branch.findUnique({ where: { slug: "tianyar" } });
  const singaraja = await prisma.branch.findUnique({
    where: { slug: "singaraja" },
  });
  const denpasar = await prisma.branch.findUnique({
    where: { slug: "denpasar" },
  });

  if (!pusat || !tianyar || !singaraja || !denpasar) {
    throw new Error("Data cabang belum lengkap");
  }

  await prisma.program.createMany({
    data: [
      {
        slug: "pelatihan-tata-boga",
        title: "Pelatihan Tata Boga",
        category: "Hospitality",
        duration: "3 Bulan",
        price: "Rp 2.500.000",
        image: "/images/program-1.jpg",
        description:
          "Program pelatihan memasak dasar hingga siap kerja di bidang kuliner dan hospitality.",
        branchId: tianyar.id,
      },
      {
        slug: "pelatihan-barista",
        title: "Pelatihan Barista Profesional",
        category: "Food & Beverage",
        duration: "2 Bulan",
        price: "Rp 1.800.000",
        image: "/images/program-2.jpg",
        description:
          "Belajar teknik dasar hingga advanced dalam dunia kopi dan pelayanan cafe modern.",
        branchId: denpasar.id,
      },
      {
        slug: "pelatihan-komputer-perkantoran",
        title: "Pelatihan Komputer Perkantoran",
        category: "Administrasi",
        duration: "3 Bulan",
        price: "Rp 2.000.000",
        image: "/images/program-3.jpg",
        description:
          "Pelatihan Microsoft Office, administrasi digital, dan skill kerja perkantoran modern.",
        branchId: singaraja.id,
      },
      {
        slug: "pelatihan-bahasa-jepang",
        title: "Pelatihan Bahasa Jepang",
        category: "Bahasa",
        duration: "6 Bulan",
        price: "Rp 4.500.000",
        image: "/images/program-4.jpg",
        description:
          "Program persiapan kerja dan komunikasi bahasa Jepang untuk kebutuhan industri dan magang.",
        branchId: pusat.id,
      },
    ],
    skipDuplicates: true,
  });

  const adminPusatPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@wtc.com" },
    update: {},
    create: {
      name: "Admin Pusat",
      email: "admin@wtc.com",
      password: adminPusatPassword,
      role: "ADMIN_PUSAT",
    },
  });
  const superAdminPassword = await bcrypt.hash("super123", 10);

await prisma.user.upsert({
  where: {
    email: "super@wtc.com",
  },
  update: {},
  create: {
    name: "Super Admin",
    email: "super@wtc.com",
    password: superAdminPassword,
    role: "SUPER_ADMIN",
  },
});
  const adminCabangData = [
    {
      name: "Admin Tianyar",
      email: "tianyar@wtc.com",
      password: "tianyar123",
      branchId: tianyar.id,
    },
    {
      name: "Admin Singaraja",
      email: "singaraja@wtc.com",
      password: "singaraja123",
      branchId: singaraja.id,
    },
    {
      name: "Admin Denpasar",
      email: "denpasar@wtc.com",
      password: "denpasar123",
      branchId: denpasar.id,
    },
  ];

  for (const admin of adminCabangData) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    await prisma.user.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
        role: "ADMIN_CABANG",
        branchId: admin.branchId,
      },
    });
  }

  console.log("Seed branch berhasil");
  console.log("Seed program berhasil");
  console.log("Seed admin pusat berhasil");
  console.log("Seed semua admin cabang berhasil");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });


console.log("Seed super admin berhasil");