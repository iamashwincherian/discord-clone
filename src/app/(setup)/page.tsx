import { redirect } from "next/navigation";

import { initialProfile } from "@/lib/initialProfile";
import { db } from "@/lib/db";
import Home from "../(main)/home/page";

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

  return <Home />;
}
