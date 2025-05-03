import { Request, Response } from "express";
import { DogSchema } from "../models/dog.models";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import * as dogService from "../service/dog.service";
import * as recomController from "../controller/recommendation.controller";

export const getDogs = async (req: Request, res: Response) => {
  try {
    const dogs = await dogService.getAllDogs();

    if (dogs && dogs.length > 0) {
      res.status(StatusCodes.OK).json({
        message: "Get all dogs successfully",
        dogs,
      });
    } else if (dogs && dogs.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "No dogs found" });
    }
  } catch (error) {
    if (error instanceof Error) {
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

export const getDogById = async (req: Request, res: Response) => {
  try {
    const dog = await dogService.getDogById(req.params.id);

    if (dog) {
      res.status(StatusCodes.OK).json({
        message: `Dog with ID: ${req.params.id} retrieved successfully`,
        dog,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Dog with ID: ${req.params.id} not found`,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
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

export const createDog = async (req: Request, res: Response) => {
  try {
    const validatedData = DogSchema.parse(req.body);
    const dog = await dogService.createDog(validatedData);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Dog created successfully", dog });

    // Create a recommendation for the newly created dog
    req.body.dogId = dog.Dog_ID;
    await recomController.createRecommendation(req, res);
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

export const updateDog = async (req: Request, res: Response) => {
  try {
    const dogId = req.params.id;
    const validatedData = DogSchema.parse(req.body);
    const updatedDog = await dogService.updateDog(dogId, validatedData);

    req.body.dogId = dogId;
    const recom = await recomController.getRecommendationByDogId(req, res);
    recom?.map((rec: {Recommendation_ID: string}) => {
      req.params.id = rec.Recommendation_ID;
    });
    await recomController.updateRecommendation(req, res);

    if (updatedDog) {
      res
        .status(StatusCodes.OK)
        .json({ message: "Dog updated successfully", updatedDog });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Dog not found" });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
    }
  }
};

export const deleteDog = async (req: Request, res: Response) => {
  try {
    const dogId = req.params.id;
    req.params.id = dogId;
    const recom = await recomController.getRecommendationByDogId(req, res);
    recom?.map((rec: {Recommendation_ID: string}) => {
      req.params.id = rec.Recommendation_ID;
    });

    await recomController.deleteRecommendation(req, res);
    const deletedDog = await dogService.deleteDog(dogId);

    if (deletedDog) {
      res.status(StatusCodes.OK).json({ message: "Dog deleted successfully" });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Dog not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
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
