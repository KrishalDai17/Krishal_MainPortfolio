import { getSettings } from "@/lib/cms/content";
import { SettingsForm } from "@/components/admin/singletons";

export default async function Page() {
  const settings = await getSettings();
  return <SettingsForm initial={settings} />;
}
