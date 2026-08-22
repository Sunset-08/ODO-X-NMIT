"use server";

import { prisma } from "@/lib/prisma";

export async function logActivity({
  userId,
  action,
  description,
  entityId,
  entityType,
}: {
  userId: number | bigint;
  action: string;
  description: string;
  entityId?: string;
  entityType?: string;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        actorUserId: BigInt(userId),
        action,
        metadata: { description },
        entityId: entityId ? BigInt(entityId) : BigInt(0),
        entityType: entityType || "Unknown",
        ipAddress: "127.0.0.1",
        userAgent: "ServerAction",
      },
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
