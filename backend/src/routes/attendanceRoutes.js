import express from "express";
import {
  getAttendance,
  getEmployeeAttendance,
  checkIn,
  checkOut,
  markAttendance,
  updateAttendance,
  getTodayAttendance,
} from "../controllers/attendanceController.js";
import authMiddleware from "../middleware/auth.js";
import { checkRole } from "../middleware/roleCheck.js";
import {
  validateAttendance,
  handleValidationErrors,
} from "../middleware/validation.js";

const router = express.Router();

/**
 * GET /api/attendance
 * Get attendance records
 */
router.get("/", authMiddleware, getAttendance);

/**
 * GET /api/attendance/employee/:employeeId
 * Get attendance for specific employee by month
 */
router.get("/employee/:employeeId", authMiddleware, getEmployeeAttendance);

/**
 * GET /api/attendance/today
 * Get today's attendance summary (Admin/HR only)
 */
router.get(
  "/today",
  authMiddleware,
  checkRole(["admin", "hr"]),
  getTodayAttendance
);

/**
 * POST /api/attendance/check-in
 * Check in
 */
router.post("/check-in", authMiddleware, checkIn);

/**
 * POST /api/attendance/check-out
 * Check out
 */
router.post("/check-out", authMiddleware, checkOut);

/**
 * POST /api/attendance/mark
 * Mark attendance manually (Admin/HR only)
 */
router.post(
  "/mark",
  authMiddleware,
  checkRole(["admin", "hr"]),
  validateAttendance,
  handleValidationErrors,
  markAttendance
);

/**
 * PUT /api/attendance/:id
 * Update attendance (Admin/HR only)
 */
router.put(
  "/:id",
  authMiddleware,
  checkRole(["admin", "hr"]),
  validateAttendance,
  handleValidationErrors,
  updateAttendance
);

export default router;
