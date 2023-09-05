import ServerSidebar from "@/components/server/ServerSidebar";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { serverId: string };
}) {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: { some: { profileId: profile.id } },
    },
  });

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        {server && <ServerSidebar serverId={server.id} />}
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
