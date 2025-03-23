import { Router } from "express";
import * as recomController from "../controller/recommendation.controller";
const router = Router();

/**
 * @swagger
 * /api/recom:
 *   get:
 *     summary: Get all recommendations
 *     description: Fetches all the recommendations from the database.
 *     tags: [Recommendation]
 *     responses:
 *       200:
 *         description: Successfully fetched all recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get all recommendations successfully"
 *                 recom:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Recommendation_ID:
 *                         type: string
 *                         example: "abc123"
 *                       dogId:
 *                         type: string
 *                         example: "dog001"
 *       404:
 *         description: No recommendations found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No recommendations found"
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
router.get("/recom", recomController.getRecommendation);
/**
 * @swagger
 * /api/recom/{id}:
 *   get:
 *     summary: Get a recommendation by ID
 *     description: Fetches a specific recommendation from the database using the recommendation ID.
 *     tags: [Recommendation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recommendation to fetch
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       200:
 *         description: Successfully fetched the recommendation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recommendation with ID: abc123"
 *                 recommendation:
 *                   type: object
 *                   properties:
 *                     Recommendation_ID:
 *                       type: string
 *                       example: "abc123"
 *                     dogId:
 *                       type: string
 *                       example: "dog001"
 *       404:
 *         description: Recommendation not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recommendation not found"
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
router.get("/recom/:id", recomController.getRecommendationById);

export default router;
