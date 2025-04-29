import prisma from "../config/prismaClient";

export const getAllNotification = async () => {
  return await prisma.notifications.findMany({
    include: {
      Feeder: true,
      Dog: true,
    },
  });
};

export const getNotificationById = async (id: string) => {
  return await prisma.notifications.findUnique({
    where: {
      Notification_ID: id,
    },
    include: {
      Feeder: true,
      Dog: true,
    },
  });
};

export const createNotification = async (notificationData: any) => {
  return await prisma.notifications.create({
    data: notificationData,
  });
};
