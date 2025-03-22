import prisma from "../config/prismaClient";

export const getAllDogs = async () => {
  return await prisma.dog.findMany();
};

export const getDogById = async (id: string) => {
  return await prisma.dog.findUnique({
    where: {
      Dog_ID: id,
    },
    include: {
      Schedules: true,
      Histories: true,
      AIRecommendations: true,
      Notifications: true,
    },
  });
};

export const createDog = async (dogData: any) => {
  return await prisma.dog.create({
    data: {
      Name: dogData.name,
      Breed: dogData.breed,
      Weight: dogData.weight,
      Disease:dogData.disease,
      Age: dogData.age,
      Sex: dogData.sex,
    },
  });
};

export const updateDog = async (id: string, dogData: any) => {
  return await prisma.dog.update({
    where: {
      Dog_ID: id,
    },
    data: dogData,
  });
};

export const deleteDog = async (id: string) => {
  return await prisma.dog.delete({
    where: {
      Dog_ID: id,
    },
  });
};
