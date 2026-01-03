import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadProfilePicture,
  getDocuments,
  uploadDocument,
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/auth.js";
import { checkRole, checkSelfOrAdmin } from "../middleware/roleCheck.js";
import {
  validateEmployeeCreate,
  handleValidationErrors,
} from "../middleware/validation.js";

const router = express.Router();

/**
 * GET /api/employees
 * Get all employees (Admin/HR only)
 */
router.get("/", authMiddleware, checkRole(["admin", "hr"]), getAllEmployees);

/**
 * POST /api/employees
 * Create new employee (Admin/HR only)
 */
router.post(
  "/",
  authMiddleware,
  checkRole(["admin", "hr"]),
  validateEmployeeCreate,
  handleValidationErrors,
  createEmployee
);

/**
 * GET /api/employees/:id
 * Get single employee
 */
router.get("/:id", authMiddleware, checkSelfOrAdmin, getEmployeeById);

/**
 * PUT /api/employees/:id
 * Update employee
 */
router.put("/:id", authMiddleware, updateEmployee);

/**
 * DELETE /api/employees/:id
 * Delete employee (Admin only)
 */
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteEmployee);

/**
 * POST /api/employees/:id/upload-profile-picture
 * Upload profile picture
 */
router.post(
  "/:id/upload-profile-picture",
  authMiddleware,
  uploadProfilePicture
);

/**
 * GET /api/employees/:id/documents
 * Get employee documents
 */
router.get("/:id/documents", authMiddleware, checkSelfOrAdmin, getDocuments);

/**
 * POST /api/employees/:id/upload-document
 * Upload document
 */
router.post("/:id/upload-document", authMiddleware, uploadDocument);

export default router;
