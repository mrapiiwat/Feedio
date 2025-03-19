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
    console.error("Error fetching dogs:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
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
    console.error("Error fetching dog by ID:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
export const createDog = async (req: Request, res: Response) => {
  try {
    const validatedData = DogSchema.parse(req.body);
    const dogData = await dogService.createDog(validatedData);
    res.status(StatusCodes.CREATED).json(dogData);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: error.errors });
    }
    console.error("Error creating dog:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const updateDog = async (req: Request, res: Response) => {
  try {
    const dogId = req.params.id;
    const validatedData = DogSchema.parse(req.body);
    const updatedDog = await dogService.updateDog(dogId, validatedData);

    if (!updatedDog) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Dog not found" });
    }

    res.status(StatusCodes.OK).json(updatedDog);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: error.errors });
    }
    console.error("Error updating dog:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const deleteDog = async (req: Request, res: Response) => {
  try {
    const dogId = req.params.id;
    const deletedDog = await dogService.deleteDog(dogId);

    if (!deletedDog) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Dog not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Dog deleted successfully" });
  } catch (error) {
    console.error("Error deleting dog:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
