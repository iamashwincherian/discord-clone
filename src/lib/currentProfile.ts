import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const user = await currentUser();
  if (!user) return;

  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  return profile;
};
