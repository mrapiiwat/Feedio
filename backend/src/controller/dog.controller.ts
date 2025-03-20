import { Request, Response } from "express";
import { DogSchema } from "../models/dog.models";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import * as dogService from "../service/dog.service";

export const getDogs = async (req: Request, res: Response) => {
  try {
    const dogs = await dogService.getAllDogs();
    res.status(StatusCodes.OK).json(dogs);
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

export const getDogById = async (req: Request, res: Response) => {
  try {
    const dog = await dogService.getDogById(req.params.id);

    if (dog) {
      res.status(StatusCodes.OK).json(dog);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Dog not found" });
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

export const createDog = async (req: Request, res: Response) => {
  try {
    const validatedData = DogSchema.parse(req.body);
    const dog = await dogService.createDog(validatedData);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Dog created successfully" });
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

    if (updatedDog) {
      res.status(StatusCodes.OK).json(updatedDog);
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
    const deletedDog = await dogService.deleteDog(dogId);

    if (deletedDog) {
      res.status(StatusCodes.OK).json({ message: "Dog deleted successfully" });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Dog not found" });
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
