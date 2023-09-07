import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

interface InvitePageProps {
  params: {
    inviteCode: string;
  };
}

export default async function InvitePage({
  params: { inviteCode },
}: InvitePageProps) {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: { inviteCode, members: { some: { profileId: profile.id } } },
  });

  if (existingServer) {
    redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: { create: [{ profileId: profile.id }] },
    },
  });

  return redirect(`/servers/${server.id}`);
}
