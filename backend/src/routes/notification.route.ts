import { Router } from "express";
import * as notificationController from "../controller/notification.controller";
const router = Router();

/**
 * @swagger
 * /api/noti:
 *   get:
 *     summary: Get all notifications
 *     description: Fetches all notifications from the database.
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Successfully fetched notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification fetched successfully"
 *                 getNoti:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       feederID:
 *                         type: string
 *                         format: uuid
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       dogID:
 *                         type: string
 *                         format: uuid
 *                         example: "123e4567-e89b-12d3-a456-426614174001"
 *                       message:
 *                         type: string
 *                         example: "Your dog has been fed"
 *       404:
 *         description: No notifications found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No notifications found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unknown error occurred"
 */
router.get("/noti", notificationController.getNotifications);
/**
 * @swagger
 * /api/noti/{id}:
 *   get:
 *     summary: Get a notification by ID
 *     description: Fetches a specific notification using its unique ID.
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification to fetch
 *     responses:
 *       200:
 *         description: Notification fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification fetched successfully"
 *                 getNoti:
 *                   type: object
 *                   properties:
 *                     feederID:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     dogID:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     message:
 *                       type: string
 *                       example: "Your dog has been fed"
 *       404:
 *         description: Notification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification id: abc123 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unknown error occurred"
 */
router.get("/noti/:id", notificationController.getNotificationById);
/**
 * @swagger
 * /api/noti:
 *   post:
 *     summary: Create a new notification
 *     description: Creates a new notification with feederID, dogID, and optional message.
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feederID
 *               - dogID
 *             properties:
 *               feederID:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               dogID:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *               message:
 *                 type: string
 *                 example: "Feeding completed"
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification created successfully"
 *                 createNoti:
 *                   type: object
 *                   properties:
 *                     feederID:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     dogID:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     message:
 *                       type: string
 *                       example: "Feeding completed"
 *       400:
 *         description: Invalid input or creation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   oneOf:
 *                     - type: string
 *                       example: "Notification creation failed"
 *                     - type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           path:
 *                             type: array
 *                             items: { type: string }
 *                             example: ["feederID"]
 *                           message:
 *                             type: string
 *                             example: "Feeder ID must be a valid UUID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unknown error occurred"
 */
router.post("/noti", notificationController.createNotification);

export default router;
