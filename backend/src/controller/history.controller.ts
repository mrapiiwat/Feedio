import { HistorySchema } from "../models/history.model";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import * as historyService from "../service/history.service";

export const getHistory = async (req: Request, res: Response) => {
  try {
    const history = await historyService.getHistory();
    if (!history) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "History not found",
      });
    } else if (history.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "History not found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "History fetched successfully",
      history,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    }
  }
};
export const getHistoryById = async (req: Request, res: Response) => {
  try {
    const historyId = req.params.id;
    const history = await historyService.getHistoryById(historyId);
    if (!history) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "History not found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "History fetched successfully",
      history,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    }
  }
};
export const createHistory = async (req: Request, res: Response) => {
  try {
    const validatedData = HistorySchema.parse(req.body);
    const history = await historyService.createHistory(validatedData);
    if (!history) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "History not created",
      });
    }
    res.status(StatusCodes.CREATED).json({
      message: "History created successfully",
      history,
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
        message: "Internal Server Error",
      });
    }
  }
};
