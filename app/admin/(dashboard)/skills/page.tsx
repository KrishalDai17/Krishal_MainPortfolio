import { createClient } from "@/lib/supabase/server";
import { SkillsEditor } from "@/components/admin/editors";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("skill_categories").select("*").order("order_index")
    : { data: [] };
  return <SkillsEditor items={data ?? []} />;
}
