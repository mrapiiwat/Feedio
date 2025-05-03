import { Router } from "express";
import * as scheduleController from "../controller/schedule.controller";
const router = Router();

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: Get all schedules
 *     description: Retrieve all dog feeder schedules from the database.
 *     tags: [Schedule]
 *     responses:
 *       200:
 *         description: Get all schedules successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Get all schedules successfully
 *                 schedules:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: No schedules found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No schedules found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred
 */
router.get("/schedules", scheduleController.getAllSchedules);
/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Create a new schedule
 *     description: Create a dog feeder schedule with feeder ID, dog ID, and food amount.
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schedule created successfully
 *                 schedule:
 *                   $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Invalid input data (validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please enter the food amount
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred
 */
router.post("/schedules", scheduleController.createSchedule);
/**
 * @swagger
 * /api/schedules/{id}:
 *   put:
 *     summary: Update a schedule by ID
 *     description: Update an existing dog feeder schedule using the schedule ID.
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the schedule to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               feederID:
 *                 type: string  
 *                 example: 7f3b7850-7790-4953-8d38-1f9391d5c4b3
 *               dogID:
 *                 type: string  
 *                 example: de7f5866-fa9e-4d8e-8880-de54d66d6e2d
 *               foodAmount:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schedule updated successfully
 *                 schedule:
 *                   $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Invalid input data (validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please enter the feeder ID
 *       404:
 *         description: Schedule not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schedule not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred
 */
router.put("/schedules/:id", scheduleController.updateSchedule);

export default router;
