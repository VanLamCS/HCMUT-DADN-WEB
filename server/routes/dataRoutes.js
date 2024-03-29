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
router.get(
    "/high-soild-moisture",
    verifyToken,
    dataController.lastHighSoidMoisture
);
router.get(
    "/low-soild-moisture",
    verifyToken,
    dataController.lastLowSoidMoisture
);
router.get(
    "/soild-moisture-range",
    verifyToken,
    dataController.lastSoildMoistureRange
);
router.get("/notifications", verifyToken, dataController.getNotifications);
router.get("/temperatures", verifyToken, dataController.getTemperatures);
router.get("/humidities", verifyToken, dataController.getHumidities);
router.get("/soildmoistures", verifyToken, dataController.getSoildMoistures);
router.get("/daytemperatures", verifyToken, dataController.getDayTemperatures);
router.get("/dayhumidities", verifyToken, dataController.getDayHumidities);
router.get(
    "/daysoildmoistures",
    verifyToken,
    dataController.getDaySoildMoistures
);
router.get("/plants-status", verifyToken, dataController.getPlantsStatus);

router.post("/setfan", verifyToken, dataController.setFan);
router.post("/setmode", verifyToken, dataController.setMode);
router.post("/setlight", verifyToken, dataController.setLight);
router.post("/setpump", verifyToken, dataController.setPump);
router.post(
    "/soild-moisture-range",
    verifyToken,
    dataController.setSoildMoistureRange
);

export default router;
