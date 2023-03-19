import express from "express";
import * as dataController from "../controllers/dataController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/lasttemperature", verifyToken, dataController.lastTemperature);
router.get("/lasthumidity", verifyToken, dataController.lastHumidity);
router.get("/lastsoildmoisture", verifyToken, dataController.lastSoildMoisture);
router.get("/lastfan", verifyToken, dataController.lastFan);
router.get("/lastlight", verifyToken, dataController.lastLight);
router.get("/lastmode", verifyToken, dataController.lastMode);
router.get("/lastpump", verifyToken, dataController.lastPump);
router.get("/notifications", verifyToken, dataController.getNotifications);

router.post("/setfan", verifyToken, dataController.setFan);
router.post("/setmode", verifyToken, dataController.setMode);
router.post("/setlight", verifyToken, dataController.setLight);
router.post("/setpump", verifyToken, dataController.setPump);

export default router;
