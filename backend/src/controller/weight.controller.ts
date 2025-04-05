import { Request, Response } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { WeightSchema } from "../models/weight.model";
import * as weightService from "../service/weight.service";

export const getAllWeights = async (req: Request, res: Response) => {
  try {
    const getAllWeights = await weightService.getAllWeights();
    if (!getAllWeights) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No weights found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Weights retrieved successfully",
      getAllWeights,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An unexpected error occurred",
      });
    }
  }
};
export const getWeightById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const weight = await weightService.getWeightById(id);
    if (!weight) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Weight not found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Weight retrieved successfully",
      weight,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An unexpected error occurred",
      });
    }
  }
};
export const createWeight = async (req: Request, res: Response) => {
  try {
    const weightData = req.body;
    const parsedWeightData = WeightSchema.parse(weightData);
    const createdWeight = await weightService.createWeight(parsedWeightData);
    res.status(StatusCodes.CREATED).json({
      message: "Weight created successfully",
      createdWeight,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors,
      });
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An unexpected error occurred",
      });
    }
  }
};
export const updateWeight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const weightData = req.body;
    const parsedWeightData = WeightSchema.parse(weightData);
    const updatedWeight = await weightService.updateWeight(
      id,
      parsedWeightData
    );
    if (!updatedWeight) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Weight not found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Weight updated successfully",
      updatedWeight,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors,
      });
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An unexpected error occurred",
      });
    }
  }
};
