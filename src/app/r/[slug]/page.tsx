import { notFound, redirect } from "next/navigation";
import { getSiteConfig } from "@/lib/site-config";

export default async function HairDriverRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getSiteConfig();

  if (slug !== config.clientSlug) {
    notFound();
  }

  redirect(config.reviewAppUrl);
}
