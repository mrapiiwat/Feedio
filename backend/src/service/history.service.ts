import prisma from "../config/prismaClient";

export const getHistory = async () => {
  const history = await prisma.feeding_History.findMany();
  return history;
};

export const getHistoryById = async (id: string) => {
  const history = await prisma.feeding_History.findUnique({
    where: { History_ID: id },
  });
  return history;
};

export const createHistory = async (historyData: any) => {
  const history = await prisma.feeding_History.create({
    data: historyData,
  });
  return history;
};
