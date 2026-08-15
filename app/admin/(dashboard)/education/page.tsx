import { createClient } from "@/lib/supabase/server";
import { EducationEditor } from "@/components/admin/editors";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("education_items").select("*").order("order_index")
    : { data: [] };
  return <EducationEditor items={data ?? []} />;
}
