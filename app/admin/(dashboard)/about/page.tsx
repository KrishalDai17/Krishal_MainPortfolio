import { getAbout } from "@/lib/cms/content";
import { AboutForm } from "@/components/admin/singletons";

export default async function Page() {
  const about = await getAbout();
  return <AboutForm initial={about} />;
}
