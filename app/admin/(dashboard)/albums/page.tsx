import { createClient } from "@/lib/supabase/server";
import { PhotographyAlbumsEditor } from "@/components/admin/editors";
import { photographyAlbums } from "@/lib/data";

export default async function AlbumsAdminPage() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("photography_albums").select("*").order("order_index")
    : { data: [] };

  const items = (data && data.length > 0)
    ? data
    : photographyAlbums.map((a, i) => ({
        id: `mock-album-${i}`,
        title: a.title,
        slug: a.slug,
        category: a.category,
        description: a.description,
        cover_image_url: a.coverImageUrl,
        cover_image_public_id: null,
        order_index: i,
        published: true,
      }));

  return <PhotographyAlbumsEditor items={items} />;
}
