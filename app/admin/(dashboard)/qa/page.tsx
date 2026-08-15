import { getQASection } from "@/lib/cms/content";
import { QAForm } from "@/components/admin/singletons";

export default async function Page() {
  const qa = await getQASection();
  return <QAForm initial={qa} />;
}
