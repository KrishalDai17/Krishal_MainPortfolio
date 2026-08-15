import { createClient } from "@/lib/supabase/server";
import { VideosEditor } from "@/components/admin/editors";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("video_items").select("*").order("order_index")
    : { data: [] };
  return <VideosEditor items={data ?? []} />;
}
