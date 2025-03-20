import prisma from "../config/prismaClient";

export const getAllRecommendations = async () => {
  return await prisma.aI_Food_Recommendation.findMany();
};

export const getRecommendationById = async (id: string) => {
  return await prisma.aI_Food_Recommendation.findUnique({
    where: {
      Recommendation_ID: id,
    },
  });
};

export const dogData = async (dogId: string) => {
  return await prisma.dog.findUnique({
    where: {
      Dog_ID: dogId,
    },
  });
};

export const createRecommendation = async (data: any) => {
  return await prisma.aI_Food_Recommendation.create({
    data: data,
  });
};

export const deleteRecommendation = async (id: string) => {
  return await prisma.aI_Food_Recommendation.delete({
    where: {
      Recommendation_ID: id,
    },
  });
};

export const updateRecommendation = async (id: string, data: any) => {
  return await prisma.aI_Food_Recommendation.update({
    where: {
      Recommendation_ID: id,
    },
    data: data,
  });
};

export const getRecommendationByDogId = async (dogId: string) => {
  return await prisma.aI_Food_Recommendation.findMany({
    where: {
      Dog_ID: dogId,
    },
  });
};
