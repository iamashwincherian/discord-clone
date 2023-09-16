"use client";

import { MemberRole, Server } from "@prisma/client";
import { ShieldCheck } from "lucide-react";
import { useParams } from "next/navigation";

import { MemberWithProfile } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ServerMemberProps {
  member: MemberWithProfile;
  server: Server;
}

const iconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />,
};

export default function ServerMember({ member }: ServerMemberProps) {
  const params = useParams();

  const icon = iconMap[member.role];
  return (
    <button
      className={cn(
        "group px-2 py-2 rounded-md flex justify-between items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          className="w-auto h-8 rounded-full"
          src={member.profile.imageUrl}
          alt="profile pic"
          height={10}
          width={10}
        />
        <p
          className={cn(
            "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
            params?.channelId === member.id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white"
          )}
        >
          {member.profile.name}
        </p>
      </div>
      {icon}
    </button>
  );
}
