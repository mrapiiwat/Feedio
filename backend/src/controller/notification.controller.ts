import { Request, Response } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import * as nofiService from "../service/notification.service";
import { NotificationSchema } from "../models/notification.model";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const getNoti = await nofiService.getAllNotification();
    if (!getNoti) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No notifications found",
      });
    } else if (getNoti.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No notifications found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Notification fetched successfully",
      getNoti,
    });
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

export const getNotificationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getNoti = await nofiService.getNotificationById(id);
    if (!getNoti) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Notification id: ${id} not found`,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Notification fetched successfully",
      getNoti,
    });
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

export const createNotification = async (req: Request, res: Response) => {
  try {
    const validatedData = NotificationSchema.parse(req.body);
    const createNoti = await nofiService.createNotification(validatedData);
    if (!createNoti) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Notification creation failed",
      });
    }
    res.status(StatusCodes.CREATED).json({
      message: "Notification created successfully",
      createNoti,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.issues,
      });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unknown error occurred" });
    }
  }
};
