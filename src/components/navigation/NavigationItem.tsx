"use client";

import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import ActionTooltip from "@/components/tooltips/ActionTooltip";
import ServerIcon from "@/components/serverIcon/ServerIcon";

interface NavigationItemProps {
  id: string;
  name: string;
}

export default function NavigationItem({ id, name }: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();
  const isSelectedServer = params?.serverId === id;

  const onServerClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} side="right">
      <button
        onClick={onServerClick}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            !isSelectedServer && "group-hover:h-[20px]",
            isSelectedServer ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            isSelectedServer && "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <ServerIcon name={name} />
        </div>
      </button>
    </ActionTooltip>
  );
}
