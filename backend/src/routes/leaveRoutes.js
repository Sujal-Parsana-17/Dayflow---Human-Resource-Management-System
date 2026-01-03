import express from "express";
import {
  getAllLeaves,
  getLeaveById,
  createLeave,
  approveLeave,
  rejectLeave,
  deleteLeave,
  getLeaveBalance,
  getPendingLeaves,
} from "../controllers/leaveController.js";
import authMiddleware from "../middleware/auth.js";
import { checkRole } from "../middleware/roleCheck.js";
import {
  validateLeave,
  handleValidationErrors,
} from "../middleware/validation.js";

const router = express.Router();

/**
 * GET /api/leaves
 * Get all leave requests
 */
router.get("/", authMiddleware, getAllLeaves);

/**
 * GET /api/leaves/pending
 * Get pending leaves (Admin/HR only)
 */
router.get(
  "/pending",
  authMiddleware,
  checkRole(["admin", "hr"]),
  getPendingLeaves
);

/**
 * GET /api/leaves/:id
 * Get single leave request
 */
router.get("/:id", authMiddleware, getLeaveById);

/**
 * POST /api/leaves
 * Create leave request
 */
router.post(
  "/",
  authMiddleware,
  validateLeave,
  handleValidationErrors,
  createLeave
);

/**
 * PUT /api/leaves/:id/approve
 * Approve leave (Admin/HR only)
 */
router.put(
  "/:id/approve",
  authMiddleware,
  checkRole(["admin", "hr"]),
  approveLeave
);

/**
 * PUT /api/leaves/:id/reject
 * Reject leave (Admin/HR only)
 */
router.put(
  "/:id/reject",
  authMiddleware,
  checkRole(["admin", "hr"]),
  rejectLeave
);

/**
 * DELETE /api/leaves/:id
 * Delete leave
 */
router.delete("/:id", authMiddleware, deleteLeave);

/**
 * GET /api/leaves/balance/:employeeId
 * Get leave balance
 */
router.get("/balance/:employeeId", authMiddleware, getLeaveBalance);

export default router;
