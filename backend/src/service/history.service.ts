import prisma from "../config/prismaClient";

// export const getHistory = async () => {
//   const history = await prisma.feeding_History.findMany();
//   return history;
// };
export const getHistory = async (query?: {start: string; end: string; isNow?: string}) => {
  let filter: any = {};
  if (query?.start && query?.end) {
    const start = new Date(query.start)
    const end = new Date(query.end)
    end.setHours(23, 59, 59, 999)

    filter = { where: { Date: { gte: start, lte: end } } }
  }

  if (query?.isNow === 'true') {
    filter.orderBy = { Date: 'desc' }
  }

  console.log('filter',filter)

  const history = await prisma.feeding_History.findMany(filter);
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
    data: historyData
  });
  return history;
};
