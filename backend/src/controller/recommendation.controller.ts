import { Request, Response } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { RecommendationSchema } from "../models/recommendation.models";
import * as recomService from "../service/recommendation.service";
import { chatWithAI } from "../config/openai";

export const getRecommendation = async (req: Request, res: Response) => {
  try {
    const recom = await recomService.getAllRecommendations();
    res.status(StatusCodes.OK).json(recom);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
    }
  }
};

export const createRecommendation = async (req: Request, res: Response) => {
  try {
    const validatedData = RecommendationSchema.parse(req.body);
    const dog = await recomService.dogData(validatedData.dogId);

    if (!dog) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Dog not found" });
    }

    const recomBrekfast = await chatWithAI(
      `Give me a breakfast recommendation for a dog with the following details: ${JSON.stringify(
        dog
      )} ให้เป็นอาหารเม็ด ควนให้กี่กรัมตอบเเค่ตัวเลข ไม่ต้องมีหน่วย `
    );
    const recomLunch = await chatWithAI(
      `Give me a lunch recommendation for a dog with the following details: ${JSON.stringify(
        dog
      )} ให้เป็นอาหารเม็ด ควนให้กี่กรัมตอบเเค่ตัวเลข ไม่ต้องมีหน่วย`
    );
    const recomDinner = await chatWithAI(
      `Give me a dinner recommendation for a dog with the following details: ${JSON.stringify(
        dog
      )} ให้เป็นอาหารเม็ด ควนให้กี่กรัมตอบเเค่ตัวเลข ไม่ต้องมีหน่วย`
    );

    await recomService.createRecommendation({
      Dog_ID: validatedData.dogId,
      Recommended_Breakfast: Number(recomBrekfast),
      Recommended_Lunch: Number(recomLunch),
      Recommended_Dinner: Number(recomDinner),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
    }
  }
};

export const deleteRecommendation = async (req: Request, res: Response) => {
  try {
    const recommendationId = req.params.id;
    await recomService.deleteRecommendation(recommendationId);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
    }
  }
};

export const updateRecommendation = async (req: Request, res: Response) => {
  try {
    const recommendationId = req.params.id;
    const validatedData = RecommendationSchema.parse(req.body);
    const dog = await recomService.dogData(validatedData.dogId);

    if (!dog) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Dog not found" });
    }

    const recomBrekfast = await chatWithAI(
      `Give me a breakfast recommendation for a dog with the following details: ${JSON.stringify(
        dog
      )} ให้เป็นอาหารเม็ด ควนให้กี่กรัมตอบเเค่ตัวเลข ไม่ต้องมีหน่วย`
    );
    const recomLunch = await chatWithAI(
      `Give me a lunch recommendation for a dog with the following details: ${JSON.stringify(
        dog
      )} ให้เป็นอาหารเม็ด ควนให้กี่กรัมตอบเเค่ตัวเลข ไม่ต้องมีหน่วย`
    );
    const recomDinner = await chatWithAI(
      `Give me a dinner recommendation for a dog with the following details: ${JSON.stringify(
        dog
      )} ให้เป็นอาหารเม็ด ควนให้กี่กรัมตอบเเค่ตัวเลข ไม่ต้องมีหน่วย`
    );

    await recomService.updateRecommendation(recommendationId, {
      Dog_ID: validatedData.dogId,
      Recommended_Breakfast: Number(recomBrekfast),
      Recommended_Lunch: Number(recomLunch),
      Recommended_Dinner: Number(recomDinner),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
    }
  }
};

export const getRecommendationByDogId = async (req: Request, res: Response) => {
  try {
    const dogId = req.params.id;
    const recommendation = await recomService.getRecommendationByDogId(dogId);
    if (!recommendation) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Recommendation not found" });
    }
    return recommendation;
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
    }
  }
};
