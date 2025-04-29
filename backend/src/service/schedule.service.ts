import prisma from "../config/prismaClient";

export const getAllSchedules = async () => {
  return await prisma.feeding_Schedule.findMany({});
};

export const createSchedule = async (scheduleData: any) => {
  return await prisma.feeding_Schedule.create({
    data: scheduleData,
  });
};

export const updateSchedule = async (id: string, scheduleData: any) => {
  return await prisma.feeding_Schedule.updateMany({
    where: {
      Schedule_ID: id,
    },
    data: scheduleData,
  });
};
