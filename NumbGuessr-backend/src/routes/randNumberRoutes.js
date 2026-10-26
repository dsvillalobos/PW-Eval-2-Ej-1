import express from "express";
import * as randNumberController from "../controllers/randNumberController.js";
const router = express.Router();

router.post("/adjust", randNumberController.getTemperature);
router.post("/reboot", randNumberController.rebootApp);

export default router;
