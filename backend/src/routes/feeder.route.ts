import { Router } from "express";
import * as feederController from "../controller/feeder.controller";

const router = Router();

/**
 * @swagger
 * /api/feeder:
 *   get:
 *     summary: Get all feeders
 *     description: Retrieve all feeders from the database.
 *     tags: [Feeder]
 *     responses:
 *       200:
 *         description: Successfully retrieved feeders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get all feeders successfully"
 *                 feeders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       food_capa:
 *                         type: number
 *                         example: 10
 *                       current_food:
 *                         type: number
 *                         example: 5
 *                       status:
 *                         type: boolean
 *                         example: true
 *       404:
 *         description: No feeders found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No feeders found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
router.get("/feeder", feederController.getFeeders);
/**
 * @swagger
 * /api/feeder/{id}:
 *   get:
 *     summary: Get a specific feeder by ID
 *     description: Retrieve a feeder by its ID from the database.
 *     tags: [Feeder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the feeder to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the feeder
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feeder with ID 123 retrieved successfully"
 *                 feeder:
 *                   type: object
 *                   properties:
 *                     food_capa:
 *                       type: number
 *                       example: 10
 *                     current_food:
 *                       type: number
 *                       example: 5
 *                     status:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Feeder not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feeder with ID 123 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
router.get("/feeder/:id", feederController.getFeederById);
/**
 * @swagger
 * /api/feeder:
 *   post:
 *     summary: Create a new feeder
 *     description: Add a new feeder to the database.
 *     tags: [Feeder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               food_capa:
 *                 type: number
 *                 example: 20
 *               current_food:
 *                 type: number
 *                 example: 15
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Feeder created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feeder created successfully"
 *                 newFeeder:
 *                   type: object
 *                   properties:
 *                     food_capa:
 *                       type: number
 *                       example: 20
 *                     current_food:
 *                       type: number
 *                       example: 15
 *                     status:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "Food Capacity must be a positive number"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
router.post("/feeder", feederController.createFeeder);
/**
 * @swagger
 * /api/feeder/{id}:
 *   put:
 *     summary: Update an existing feeder
 *     description: Update the details of an existing feeder in the database.
 *     tags: [Feeder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the feeder to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               food_capa:
 *                 type: number
 *                 example: 25
 *               current_food:
 *                 type: number
 *                 example: 10
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Feeder updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feeder updated successfully"
 *                 updatedFeeder:
 *                   type: object
 *                   properties:
 *                     food_capa:
 *                       type: number
 *                       example: 25
 *                     current_food:
 *                       type: number
 *                       example: 10
 *                     status:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "Food Capacity must be a positive number"
 *       404:
 *         description: Feeder not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feeder with ID {id} not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
router.put("/feeder/:id", feederController.updateFeeder);
/**
 * @swagger
 * /api/feeder/{id}:
 *   delete:
 *     summary: Delete a feeder
 *     description: Delete a feeder from the database by its ID.
 *     tags: [Feeder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the feeder to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feeder deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feeder deleted successfully"
 *                 deletedFeeder:
 *                   type: object
 *                   properties:
 *                     food_capa:
 *                       type: number
 *                       example: 25
 *                     current_food:
 *                       type: number
 *                       example: 10
 *                     status:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Feeder not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feeder with ID {id} not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
router.delete("/feeder/:id", feederController.deleteFeeder);

export default router;
