import { createClient } from "@/lib/supabase/server";
import { PhotographyEditor } from "@/components/admin/editors";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("photo_items").select("*").order("order_index")
    : { data: [] };
  return <PhotographyEditor items={data ?? []} />;
}
