import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import ReactMarkdown from "react-markdown";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return {
    title: `${blog.title} | Blog LPK`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await prisma.blog.findMany({
    where: {
      NOT: {
        id: blog.id,
      },
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/50">
      <Reveal>
        <article className="relative overflow-hidden py-20">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-6">
            <Link
              href="/blog"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Kembali ke Blog
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600">
                {blog.category}
              </span>

              <span>{blog.date}</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              {blog.title}
            </h1>

            <p className="mt-10 rounded-[22px] border border-white/80 text-lg leading-8 p-8 shadow-sm backdrop-blur text-slate-600">
              {blog.excerpt}
            </p>

            <div className="relative mt-10 h-[280px] overflow-hidden rounded-[32px] border border-white/80 bg-white p-3 shadow-2xl md:h-[420px]">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="rounded-[24px] object-cover"
                priority
              />
            </div>

            <div className="mt-10 rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-sm backdrop-blur">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 text-black prose-p:leading-8 prose-li:text-slate-700">
  <ReactMarkdown>
    {blog.content}
  </ReactMarkdown>
</div>
            </div>
          </div>
        </article>
      </Reveal>

      <div className="h-[3px] w-full bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent" />

      {relatedBlogs.length > 0 && (
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-blue-600">
                  Artikel Lainnya
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  Baca Juga
                </h2>
              </div>

              <Link
                href="/blog"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
              >
                Semua Artikel
              </Link>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {relatedBlogs.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-sm backdrop-blur transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                      {item.category}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {item.excerpt}
                    </p>

                    <Link
                      href={`/blog/${item.slug}`}
                      className="mt-6 inline-flex font-semibold text-blue-600"
                    >
                      Baca →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}