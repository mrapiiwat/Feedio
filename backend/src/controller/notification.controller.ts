import { RequestHandler } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import * as nofiService from "../service/notification.service";
import { NotificationSchema } from "../models/notification.model";

export const getNotifications: RequestHandler = async (req, res) => {
  try {
    const getNoti = await nofiService.getAllNotification();
    if (!getNoti || getNoti.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No notifications found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Notification fetched successfully",
      getNoti,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const getNotificationById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const getNoti = await nofiService.getNotificationById(id);
    if (!getNoti) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Notification id: ${id} not found`,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Notification fetched successfully",
      getNoti,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const createNotification: RequestHandler = async (req, res) => {
  try {
    const validatedData = NotificationSchema.parse(req.body);
    const createNoti = await nofiService.createNotification(validatedData);
    if (!createNoti) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Notification creation failed",
      });
      return;
    }

    res.status(StatusCodes.CREATED).json({
      message: "Notification created successfully",
      createNoti,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.issues,
      });
      return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
