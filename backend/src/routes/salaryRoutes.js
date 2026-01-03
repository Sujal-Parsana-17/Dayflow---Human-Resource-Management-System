import express from "express";
import {
  getSalary,
  getAllSalaries,
  createSalary,
  updateSalary,
  deleteSalary,
} from "../controllers/salaryController.js";
import authMiddleware from "../middleware/auth.js";
import { checkRole } from "../middleware/roleCheck.js";

const router = express.Router();

/**
 * GET /api/salaries
 * Get all salaries (Admin/HR only)
 */
router.get("/", authMiddleware, checkRole(["admin", "hr"]), getAllSalaries);

/**
 * GET /api/salaries/:employeeId
 * Get salary by employee ID
 */
router.get("/:employeeId", authMiddleware, getSalary);

/**
 * POST /api/salaries
 * Create salary structure (Admin/HR only)
 */
router.post("/", authMiddleware, checkRole(["admin", "hr"]), createSalary);

/**
 * PUT /api/salaries/:employeeId
 * Update salary structure (Admin/HR only)
 */
router.put(
  "/:employeeId",
  authMiddleware,
  checkRole(["admin", "hr"]),
  updateSalary
);

/**
 * DELETE /api/salaries/:employeeId
 * Delete salary (Admin only)
 */
router.delete(
  "/:employeeId",
  authMiddleware,
  checkRole(["admin"]),
  deleteSalary
);

export default router;
