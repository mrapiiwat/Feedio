import { Router } from "express";
import * as weightController from "../controller/weight.controller";
const router = Router();

/**
 * @swagger
 * /api/weightSensor:
 *   get:
 *     summary: Get weight data from sensor
 *     description: Fetches the current or latest weight data from the sensor.
 *     tags: [Weight]
 *     responses:
 *       200:
 *         description: Weight data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Weight data retrieved successfully"
 *                 weight:
 *                   type: object
 *                   properties:
 *                     feederID:
 *                       type: string
 *                       example: "feeder001"
 *                     measuredWeight:
 *                       type: number
 *                       example: 11.7
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-05T14:45:00.000Z"
 *       404:
 *         description: Weight sensor data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No weight data found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/weightSensor", weightController.getAllWeights);
/**
 * @swagger
 * /weights/{id}:
 *   get:
 *     summary: Get weight data by ID
 *     description: Retrieves a specific weight entry from the database using its ID.
 *     tags: [Weight]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the weight record
 *     responses:
 *       200:
 *         description: Weight retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Weight retrieved successfully"
 *                 weight:
 *                   type: object
 *                   properties:
 *                     feederID:
 *                       type: string
 *                       example: "feeder001"
 *                     measuredWeight:
 *                       type: number
 *                       example: 10.8
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-05T13:00:00.000Z"
 *       404:
 *         description: Weight not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Weight not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/weightSensor/:id", weightController.getWeightById);
/**
 * @swagger
 * /weights:
 *   post:
 *     summary: Create a new weight record
 *     description: Adds a new weight measurement to the database.
 *     tags: [Weight]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feederID
 *               - measuredWeight
 *             properties:
 *               feederID:
 *                 type: string
 *                 example: "feeder001"
 *               measuredWeight:
 *                 type: number
 *                 example: 9.5
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-05T15:30:00.000Z"
 *     responses:
 *       201:
 *         description: Weight created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Weight created successfully"
 *                 createdWeight:
 *                   type: object
 *                   properties:
 *                     feederID:
 *                       type: string
 *                       example: "feeder001"
 *                     measuredWeight:
 *                       type: number
 *                       example: 9.5
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-05T15:30:00.000Z"
 *       400:
 *         description: Invalid input
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
 *                         example: ["measuredWeight"]
 *                       message:
 *                         type: string
 *                         example: "Measured weight is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.post("/weightSensor", weightController.createWeight);
/**
 * @swagger
 * /weights/{id}:
 *   put:
 *     summary: Update a weight record
 *     description: Updates an existing weight record in the database by ID.
 *     tags: [Weight]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the weight record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feederID
 *               - measuredWeight
 *             properties:
 *               feederID:
 *                 type: string
 *                 example: "feeder001"
 *               measuredWeight:
 *                 type: number
 *                 example: 10.2
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-05T16:00:00.000Z"
 *     responses:
 *       200:
 *         description: Weight updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Weight updated successfully"
 *                 updatedWeight:
 *                   type: object
 *                   properties:
 *                     feederID:
 *                       type: string
 *                       example: "feeder001"
 *                     measuredWeight:
 *                       type: number
 *                       example: 10.2
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-05T16:00:00.000Z"
 *       400:
 *         description: Invalid input
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
 *                         example: ["measuredWeight"]
 *                       message:
 *                         type: string
 *                         example: "Measured weight is required"
 *       404:
 *         description: Weight not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Weight not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.put("/weightSensor/:id", weightController.updateWeight);

export default router;
