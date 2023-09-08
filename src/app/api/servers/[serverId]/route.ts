import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params: { serverId } }: { params: { serverId: string } }
) {
  try {
    const { name } = await req.json();

    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("NOT_FOUND", { status: 404 });
    }

    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: { name },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("SERVER_UPDATE_ERROR", { status: 400 });
  }
}
