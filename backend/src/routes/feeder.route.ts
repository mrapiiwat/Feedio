import { Router } from "express";
import * as feederController from "../controller/feeder.controller";

const router = Router();

router.get("/feeder", feederController.getFeeders);
router.get("/feeder/:id", feederController.getFeederById);
router.post("/feeder", feederController.createFeeder);
router.put("/feeder/:id", feederController.updateFeeder);
router.delete("/feeder/:id", feederController.deleteFeeder);

export default router;
