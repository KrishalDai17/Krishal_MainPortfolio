import { createClient } from "@/lib/supabase/server";
import { SocialLinksEditor } from "@/components/admin/editors";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("social_links").select("*").order("order_index")
    : { data: [] };
  return <SocialLinksEditor items={data ?? []} />;
}
