import { Router } from "express";
import * as recomController from "../controller/recommendation.controller";
const router = Router();

router.get("/recom", recomController.getRecommendation);
router.post("/recom", recomController.createRecommendation);
router.delete("/recom/:id", recomController.deleteRecommendation);

export default router;
