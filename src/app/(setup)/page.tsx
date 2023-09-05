import { redirect } from "next/navigation";

import { initialProfile } from "@/lib/initialProfile";
import InitialModal from "@/components/modals/CreateServerModal";
import { db } from "@/lib/db";

export default async function SetupPage() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}
