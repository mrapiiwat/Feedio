import { HistorySchema } from "../models/history.model";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import * as historyService from "../service/history.service";

export const getHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filterDate = req.query as unknown as { start: string; end: string; isNow: string }

    const history = await historyService.getHistory(filterDate);
    if (!history || history.length === 0) {
      res.status(StatusCodes.OK).json({
        message: "History not found",
        history
      });
      return
    }

    res.status(StatusCodes.OK).json({
      message: "History fetched successfully",
      history,
    });
    return
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
      return
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
      return
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
      return
    }
    res.status(StatusCodes.OK).json({
      message: "History fetched successfully",
      history,
    });
    return
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
      return
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
      return
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
      return
    }
    res.status(StatusCodes.CREATED).json({
      message: "History created successfully",
      history,
    });
    return
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors,
      });
      return
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
      return
    }
  }
};
