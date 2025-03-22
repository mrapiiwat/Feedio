import { Router } from "express";
import * as recomController from "../controller/recommendation.controller";
const router = Router();

router.get("/recom", recomController.getRecommendation);
router.get("/recom/:id", recomController.getRecommendationById);

export default router;
