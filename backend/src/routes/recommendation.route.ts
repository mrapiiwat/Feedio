import { Router } from "express";
import * as recomController from "../controller/recommendation.controller";
const router = Router();

router.get("/recom", recomController.getRecommendation);

export default router;
