import { getContactMessages } from "@/lib/cms/content";
import ContactMessagesInbox from "@/components/admin/ContactMessagesInbox";

export const revalidate = 0; // always dynamic

export default async function MessagesAdminPage() {
  const messages = await getContactMessages();
  return <ContactMessagesInbox messages={messages} />;
}
