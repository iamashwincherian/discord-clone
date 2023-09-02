"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const { serverId } = useParams();
  return <>Server {serverId}</>;
}
