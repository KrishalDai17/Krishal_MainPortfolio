import { createClient } from "@/lib/supabase/server";
import { SocialLinksEditor } from "@/components/admin/editors";
import { socialCards } from "@/lib/data";

export default async function Page() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("social_links").select("*").order("order_index")
    : { data: [] };

  const items =
    data && data.length > 0
      ? data
      : socialCards.map((s, i) => ({
          id: `mock-social-${i}`,
          key: s.key,
          label: s.label,
          tagline: s.tagline,
          handle: s.handle,
          url: s.url,
          cta: s.cta,
          order_index: i,
          published: true,
        }));

  return <SocialLinksEditor items={items} />;
}
