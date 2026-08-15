import { getProfile } from "@/lib/cms/content";
import { HeroProfileForm } from "@/components/admin/singletons";

export default async function Page() {
  const profile = await getProfile();
  return <HeroProfileForm initial={profile} />;
}
