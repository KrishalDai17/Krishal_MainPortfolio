import { createClient } from "@/lib/supabase/server";
import { ProjectsEditor } from "@/components/admin/editors";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("projects").select("*").order("order_index")
    : { data: [] };
  return <ProjectsEditor items={data ?? []} />;
}
