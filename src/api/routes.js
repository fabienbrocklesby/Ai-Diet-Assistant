import express from "express";

import authController from "./controllers/auth.controller.js";

const router = express.Router();

// Auth routes
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/verify-email", authController.verifyEmail);

export default router;
