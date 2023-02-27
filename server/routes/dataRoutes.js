import express from "express";
import * as dataController from "../controllers/dataController.js";

const router = express.Router();

router.get("/lasttemperature", dataController.lastTemperature);
router.get("/lasthumidity", dataController.lastHumidity);
router.get("/lastsoildmoisture", dataController.lastSoildMoisture);

export default router;
