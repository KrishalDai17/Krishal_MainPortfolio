import { getPhilosophy } from "@/lib/cms/content";
import { PhilosophyForm } from "@/components/admin/singletons";

export default async function Page() {
  const philosophy = await getPhilosophy();
  return <PhilosophyForm initial={philosophy} />;
}
