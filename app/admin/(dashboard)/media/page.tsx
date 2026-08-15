import { createClient } from "@/lib/supabase/server";
import { MediaLibraryEditor } from "@/components/admin/editors";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("media_assets").select("*").order("order_index")
    : { data: [] };
  return <MediaLibraryEditor items={data ?? []} />;
}
