import { redirect } from "next/navigation";

import NagivationAction from "@/components/navigation/NavigationAction";
import NavigationItem from "@/components/navigation/NavigationItem";
import { currentProfile } from "@/lib/currentProfile";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeSwitcher } from "@/components/themeSwitcher/ThemeSwitcher";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";

export default async function NavigationSidebar() {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const servers = await db.server.findMany({
    where: { members: { some: { profileId: profile.id } } },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NagivationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rouded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem id={server.id} name={server.name} />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ThemeSwitcher />
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: "h-[45px] w-[45px]" } }}
        />
      </div>
    </div>
  );
}
