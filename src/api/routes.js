import express from "express";

import authController from "./controllers/auth.controller.js";

const router = express.Router();

// Auth routes
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/verify-email", authController.verifyEmail);
router.get("/logout", authController.logout);

export default router;
