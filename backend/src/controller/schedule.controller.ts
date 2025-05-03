import { Request, Response } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import * as scheduleService from "../service/schedule.service";
import { ScheduleSchema, ScheduleSchemaUpdate } from "../models/schedule.model";

export const getAllSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await scheduleService.getAllSchedules();
    if (!schedules || schedules.length === 0) {
      res.status(StatusCodes.OK).json({ message: "No schedules found", schedules: [], });
      return
    }

    res.status(StatusCodes.OK).json({
      message: "Get all schedules successfully",
      schedules,
    });
    return
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
      return
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
      return
    }
  }
};

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const validatedData = ScheduleSchema.parse(req.body);
    const data = await scheduleService.createSchedule(validatedData);

    res.status(StatusCodes.CREATED).json({
      message: "Schedule created successfully",
      schedule: data,
    });
    return
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors[0].message,
      });
      return
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
      return
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
      return
    }
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const scheduleId = req.params.id;
    const validatedData = ScheduleSchemaUpdate.parse(req.body);
    const updatedSchedule = await scheduleService.updateSchedule(
      scheduleId,
      validatedData
    );

    if (updatedSchedule) {
      res.status(StatusCodes.OK).json({
        message: "Schedule updated successfully",
        schedule: validatedData,
      });
      return
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Schedule not found",
      });
      return
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors[0].message,
      });
      return
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
      return
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
      return
    }
  }
}
