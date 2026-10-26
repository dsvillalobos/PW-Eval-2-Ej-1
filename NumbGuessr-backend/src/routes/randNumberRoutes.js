import express from "express";
import * as randNumberController from "../controllers/randNumberController.js";
const router = express.Router();

router.post("/guess", randNumberController.getNumber);
router.post("/reset", randNumberController.resetNumber);

export default router;
