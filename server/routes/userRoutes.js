import express from "express";
import * as userController from "../controllers/UserController.js";

const router = express.Router();

// router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
