import { createClient } from "@/lib/supabase/server";
import { ExperienceEditor } from "@/components/admin/editors";
import { experience } from "@/lib/data";

export default async function ExperienceAdminPage() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("experience_items").select("*").order("order_index")
    : { data: [] };

  const items = (data && data.length > 0)
    ? data
    : experience.map((e, i) => ({
        id: `mock-exp-${i}`,
        company: e.company,
        position: e.position,
        period: e.period,
        description: e.description,
        responsibilities: e.responsibilities,
        technologies: e.technologies,
        order_index: i,
        published: true,
      }));

  return <ExperienceEditor items={items} />;
}
