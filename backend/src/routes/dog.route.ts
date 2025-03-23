import { Router } from "express";
import * as dogController from "../controller/dog.controller";

const router = Router();

/**
 * @swagger
 * /api/dog:
 *   get:
 *     summary: Retrieve a list of dogs
 *     description: Fetch all dogs from the database.
 *     tags: [Dog]
 *     responses:
 *       200:
 *         description: A list of dogs retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get all dogs successfully"
 *                 dogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Buddy"
 *                       breed:
 *                         type: string
 *                         example: "Labrador"
 *                       weight:
 *                         type: number
 *                         example: 25.5
 *                       disease:
 *                         type: string
 *                         example: "None"
 *                       age:
 *                         type: number
 *                         example: 5
 *                       sex:
 *                         type: string
 *                         enum: ["Male", "Female", "Unknown"]
 *                         example: "Male"
 *       404:
 *         description: No dogs found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No dogs found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
router.get("/dog", dogController.getDogs);
/**
 * @swagger
 * /api/dog/{id}:
 *   get:
 *     summary: Retrieve a single dog by ID
 *     description: Fetch a specific dog from the database using its ID.
 *     tags: [Dog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the dog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dog retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dog with ID: 123 retrieved successfully"
 *                 dog:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Buddy"
 *                     breed:
 *                       type: string
 *                       example: "Labrador"
 *                     weight:
 *                       type: number
 *                       example: 25.5
 *                     disease:
 *                       type: string
 *                       example: "None"
 *                     age:
 *                       type: number
 *                       example: 5
 *                     sex:
 *                       type: string
 *                       enum: ["Male", "Female", "Unknown"]
 *                       example: "Male"
 *       404:
 *         description: Dog not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dog with ID: 123 not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
router.get("/dog/:id", dogController.getDogById);
/**
 * @swagger
 * /api/dog:
 *   post:
 *     summary: Create a new dog
 *     description: Add a new dog to the database and generate recommendations.
 *     tags: [Dog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Buddy"
 *               breed:
 *                 type: string
 *                 example: "Labrador"
 *               weight:
 *                 type: number
 *                 example: 25.5
 *               disease:
 *                 type: string
 *                 example: "None"
 *               age:
 *                 type: number
 *                 example: 5
 *               sex:
 *                 type: string
 *                 enum: ["Male", "Female", "Unknown"]
 *                 example: "Male"
 *     responses:
 *       201:
 *         description: Dog created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dog created successfully"
 *                 dog:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Buddy"
 *                     breed:
 *                       type: string
 *                       example: "Labrador"
 *                     weight:
 *                       type: number
 *                       example: 25.5
 *                     disease:
 *                       type: string
 *                       example: "None"
 *                     age:
 *                       type: number
 *                       example: 5
 *                     sex:
 *                       type: string
 *                       enum: ["Male", "Female", "Unknown"]
 *                       example: "Male"
 *       400:
 *         description: Validation error.
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
 *                         example: "Weight must be a positive number"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
router.post("/dog", dogController.createDog);
/**
 * @swagger
 * /api/dog/{id}:
 *   put:
 *     summary: Update an existing dog
 *     description: Update a dog's details in the database and update related recommendations.
 *     tags: [Dog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the dog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Buddy"
 *               breed:
 *                 type: string
 *                 example: "Labrador"
 *               weight:
 *                 type: number
 *                 example: 26.0
 *               disease:
 *                 type: string
 *                 example: "None"
 *               age:
 *                 type: number
 *                 example: 6
 *               sex:
 *                 type: string
 *                 enum: ["Male", "Female", "Unknown"]
 *                 example: "Male"
 *     responses:
 *       200:
 *         description: Dog updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dog updated successfully"
 *                 updatedDog:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Buddy"
 *                     breed:
 *                       type: string
 *                       example: "Labrador"
 *                     weight:
 *                       type: number
 *                       example: 26.0
 *                     disease:
 *                       type: string
 *                       example: "None"
 *                     age:
 *                       type: number
 *                       example: 6
 *                     sex:
 *                       type: string
 *                       enum: ["Male", "Female", "Unknown"]
 *                       example: "Male"
 *       400:
 *         description: Validation error.
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
 *                         example: "Age must be a positive number"
 *       404:
 *         description: Dog not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dog not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put("/dog/:id", dogController.updateDog);
/**
 * @swagger
 * /api/dog/{id}:
 *   delete:
 *     summary: Delete an existing dog
 *     description: Delete a dog from the database and its related recommendations.
 *     tags: [Dog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the dog to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dog deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dog deleted successfully"
 *       404:
 *         description: Dog not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dog not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete("/dog/:id", dogController.deleteDog);

export default router;
