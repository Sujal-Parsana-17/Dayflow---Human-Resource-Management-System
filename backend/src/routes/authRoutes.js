import express from "express";
import {
  signup,
  signin,
  getCurrentUser,
  logout,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";
import {
  validateSignup,
  validateSignin,
  handleValidationErrors,
} from "../middleware/validation.js";

const router = express.Router();

/**
 * POST /api/auth/signup
 * Register new user
 */
router.post("/signup", validateSignup, handleValidationErrors, signup);

/**
 * POST /api/auth/signin
 * Login user
 */
router.post("/signin", validateSignin, handleValidationErrors, signin);

/**
 * GET /api/auth/me
 * Get current user
 */
router.get("/me", authMiddleware, getCurrentUser);

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post("/logout", authMiddleware, logout);

export default router;
