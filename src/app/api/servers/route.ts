import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { MemberRole } from "@prisma/client";

const schema = z.object({
  name: z.string(),
});

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();
    const { name } = body;
    const profile = await initialProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const schemaValidation = schema.safeParse(body);
    if (!schemaValidation.success) {
      const { errors } = schemaValidation.error;
      return new NextResponse("INVALID", { status: 400 });
    }

    const server = await db.server.create({
      data: {
        name,
        profileId: profile.id,
        inviteCode: uuid(),
        channels: {
          create: { name: "general", profileId: profile.id },
        },
        members: {
          create: { profileId: profile.id, role: MemberRole.ADMIN },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error(error);
  }
}
