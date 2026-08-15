import { getSEO } from "@/lib/cms/content";
import { SEOForm } from "@/components/admin/singletons";

export default async function Page() {
  const seo = await getSEO();
  return <SEOForm initial={seo} />;
}
