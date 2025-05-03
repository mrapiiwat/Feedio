import prisma from "../config/prismaClient";

export const getAllSchedules = async () => {
  return await prisma.feeding_Schedule.findMany({});
};

export const createSchedule = async (scheduleData: any) => {
   const resCreate =await prisma.feeding_Schedule.create({
    data: {
      Feeder_ID: scheduleData.feederID,
      Dog_ID: scheduleData.dogID,
      Food_Amount: scheduleData.foodAmount,
      Day_Type: scheduleData.dayType,
    },
  });

  return {scheduleId: resCreate?.Schedule_ID}
};

export const updateSchedule = async (id: string, scheduleData: any) => {
  return await prisma.feeding_Schedule.updateMany({
    where: {
      Schedule_ID: id,
    },
    data: {
      Feeder_ID: scheduleData.feederID,
      Dog_ID: scheduleData.dogID,
      Food_Amount: scheduleData.foodAmount,
    },
  });
};
