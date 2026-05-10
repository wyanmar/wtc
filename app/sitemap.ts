import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://domainanda.com";

  const programs = await prisma.program.findMany();
  const blogs = await prisma.blog.findMany();
  const branches = await prisma.branch.findMany();

  const programUrls = programs.map((item) => ({
    url: `${baseUrl}/program/${item.slug}`,
    lastModified: item.updatedAt,
  }));

  const blogUrls = blogs.map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: item.updatedAt,
  }));

  const branchUrls = branches.map((item) => ({
    url: `${baseUrl}/cabang/${item.slug}`,
    lastModified: item.updatedAt,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/program`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/cabang`,
      lastModified: new Date(),
    },

    ...programUrls,
    ...blogUrls,
    ...branchUrls,
  ];
}