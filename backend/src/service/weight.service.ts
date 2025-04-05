import prisma from "../config/prismaClient";

export const getAllWeights = async () => {
  return await prisma.weight_Sensor.findMany();
};

export const getWeightById = async (id: string) => {
  return await prisma.weight_Sensor.findUnique({
    where: {
      Sensor_ID: id,
    },
  });
};

export const createWeight = async (weightData: any) => {
  return await prisma.weight_Sensor.create({
    data: weightData,
  });
};

export const updateWeight = async (id: string, weightData: any) => {
  return await prisma.weight_Sensor.updateMany({
    where: {
      Sensor_ID: id,
    },
    data: weightData,
  });
};
