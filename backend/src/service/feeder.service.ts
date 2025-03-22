import prisma from "../config/prismaClient";

export const getAllFeeder = async () => {
  return await prisma.feeder.findMany();
};

export const getFeederById = async (id: string) => {
  return await prisma.feeder.findUnique({
    where: {
      Feeder_ID: id,
    },
    include: {
      Schedules: true,
      Histories: true,
      Sensors: true,
      Notifications: true,
    },
  });
};

export const createFeeder = async (capacityData: any) => {
  return await prisma.feeder.create({
    data: {
      Food_Capacity: capacityData.food_capa,
      Current_Food: capacityData.current_food,
      Status: capacityData.status ?? true,
    },
  });
};

export const updateFeeder = async (id: string, capacityData: any) => {
  return await prisma.feeder.update({
    where: {
      Feeder_ID: id,
    },
    data: {
      Food_Capacity: capacityData.food_capa,
      Current_Food: capacityData.current_food,
      Status: capacityData.status ?? true,
    },
  });
};

export const deleteFeeder = async (id: string) => {
  return await prisma.feeder.delete({
    where: {
      Feeder_ID: id,
    },
  });
};
