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

    if (!recomDinner || !recomLunch || !recomBrekfast) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Recommendation not found" });
    }

    await recomService.createRecommendation({
      Dog_ID: validatedData.dogId,
      Recommended_Breakfast: Number(recomBrekfast),
      Recommended_Lunch: Number(recomLunch),
      Recommended_Dinner: Number(recomDinner),
    });

    res.status(StatusCodes.CREATED).json({
      message: `Recommendation Food for ${dog?.Name}`,
      data: {
        dogId: validatedData.dogId,
        breakfast: `${recomBrekfast} กรัม`,
        lunch: `${recomLunch} กรัม`,
        dinner: `${recomDinner} กรัม`,
      },
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
    const deletedRecommendation = await recomService.deleteRecommendation(
      recommendationId
    );
    if (!deletedRecommendation) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Recommendation not found" });
    }
    res.status(StatusCodes.OK).json({
      message: "Recommendation deleted successfully",
      data: deletedRecommendation,
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
