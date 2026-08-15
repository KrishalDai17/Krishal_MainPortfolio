import { getDataSection } from "@/lib/cms/content";
import { DataSectionForm } from "@/components/admin/singletons";

export default async function Page() {
  const data = await getDataSection();
  return <DataSectionForm initial={data} />;
}
