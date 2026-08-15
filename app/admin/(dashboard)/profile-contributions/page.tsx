import { createClient } from "@/lib/supabase/server";
import { ContributionsEditor } from "@/components/admin/editors";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("contribution_items").select("*").order("order_index")
    : { data: [] };
  return <ContributionsEditor items={data ?? []} />;
}
