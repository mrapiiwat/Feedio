import { Router } from "express";
import * as historyController from "../controller/history.controller";
const router = Router();

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Get all history records
 *     description: Retrieves all history records from the database.
 *     tags: [History]
 *     responses:
 *       200:
 *         description: Successfully fetched all history records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "History fetched successfully"
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       feederID:
 *                         type: string
 *                         example: "feeder001"
 *                       dogID:
 *                         type: string
 *                         example: "dog001"
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-04-05"
 *                       time:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-05T14:00:00.000Z"
 *                       given_Amount:
 *                         type: number
 *                         example: 1.2
 *                       remaining_Amount:
 *                         type: number
 *                         example: 0.8
 *                       image_Captured:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *       404:
 *         description: No history found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "History not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get("/history", historyController.getHistory);
/**
 * @swagger
 * /api/history/{id}:
 *   get:
 *     summary: Get a specific history record by ID
 *     description: Retrieves a specific history record from the database by ID.
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the history record
 *     responses:
 *       200:
 *         description: Successfully fetched the history record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "History fetched successfully"
 *                 history:
 *                   type: object
 *                   properties:
 *                     feederID:
 *                       type: string
 *                       example: "feeder001"
 *                     dogID:
 *                       type: string
 *                       example: "dog001"
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-04-05"
 *                     time:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-05T14:00:00.000Z"
 *                     given_Amount:
 *                       type: number
 *                       example: 1.2
 *                     remaining_Amount:
 *                       type: number
 *                       example: 0.8
 *                     image_Captured:
 *                       type: string
 *                       example: "https://example.com/image.jpg"
 *       404:
 *         description: History not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "History not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get("/history/:id", historyController.getHistoryById);
/**
 * @swagger
 * /api/history:
 *   post:
 *     summary: Create a new history record
 *     description: Adds a new history record to the database.
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feederID
 *               - dogID
 *               - date
 *               - time
 *               - given_Amount
 *               - remaining_Amount
 *             properties:
 *               feederID:
 *                 type: string
 *                 example: "feeder001"
 *               dogID:
 *                 type: string
 *                 example: "dog001"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-05"
 *               time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-05T14:00:00.000Z"
 *               given_Amount:
 *                 type: number
 *                 example: 1.2
 *               remaining_Amount:
 *                 type: number
 *                 example: 0.8
 *               image_Captured:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: History record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "History created successfully"
 *                 history:
 *                   type: object
 *                   properties:
 *                     feederID:
 *                       type: string
 *                       example: "feeder001"
 *                     dogID:
 *                       type: string
 *                       example: "dog001"
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-04-05"
 *                     time:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-05T14:00:00.000Z"
 *                     given_Amount:
 *                       type: number
 *                       example: 1.2
 *                     remaining_Amount:
 *                       type: number
 *                       example: 0.8
 *                     image_Captured:
 *                       type: string
 *                       example: "https://example.com/image.jpg"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: array
 *                         items: { type: string }
 *                         example: ["given_Amount"]
 *                       message:
 *                         type: string
 *                         example: "Given amount must be positive"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post("/history", historyController.createHistory);

export default router;
