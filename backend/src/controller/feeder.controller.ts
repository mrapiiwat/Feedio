import { Request, Response } from "express";
import { FeederSchema } from "../models/feeder.model";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import * as feederService from "../service/feeder.service";

export const getFeeders = async (req: Request, res: Response) => {
  try {
    const feeders = await feederService.getAllFeeder();
    if (feeders && feeders.length > 0) {
      res
        .status(StatusCodes.OK)
        .json({ message: "Get all feeders successfully", feeders });
    } else if (feeders && feeders.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No feeders found",
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

export const getFeederById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feeder = await feederService.getFeederById(id);
    if (feeder) {
      res.status(StatusCodes.OK).json({
        message: `Feeder with ID ${id} retrieved successfully`,
        feeder,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Feeder with ID ${id} not found`,
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

export const createFeeder = async (req: Request, res: Response) => {
  try {
    const feederData = FeederSchema.parse(req.body);
    const newFeeder = await feederService.createFeeder(feederData);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Feeder created successfully", newFeeder });
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

export const updateFeeder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feederData = FeederSchema.parse(req.body);
    const updatedFeeder = await feederService.updateFeeder(id, feederData);
    if (updatedFeeder) {
      res.status(StatusCodes.OK).json({
        message: "Feeder updated successfully",
        updatedFeeder,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Feeder with ID ${id} not found`,
      });
    }
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

export const deleteFeeder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedFeeder = await feederService.deleteFeeder(id);
    if (deletedFeeder) {
      res.status(StatusCodes.OK).json({
        message: "Feeder deleted successfully",
        deletedFeeder,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Feeder with ID ${id} not found`,
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
