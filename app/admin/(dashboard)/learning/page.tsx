import { createClient } from "@/lib/supabase/server";
import { LearningEditor } from "@/components/admin/editors";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("learning_items").select("*").order("order_index")
    : { data: [] };
  return <LearningEditor items={data ?? []} />;
}
