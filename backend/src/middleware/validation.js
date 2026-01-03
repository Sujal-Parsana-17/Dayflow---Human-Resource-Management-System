import { body, validationResult } from "express-validator";

export const validateSignup = [
  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 2 })
    .withMessage("Company name must be at least 2 characters"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("Please provide a valid email"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[+]?[0-9]{10,15}$/)
    .withMessage("Phone number must be 10-15 digits"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  // Optional fields - don't validate, just pass through
  body("companyLogo").optional(),
];

export const validateSignin = [
  body("identifier").notEmpty().withMessage("Email or Login ID is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateEmployeeCreate = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("Please provide a valid email"),
  body("phone")
    .matches(/^[0-9]{10,15}$/)
    .withMessage("Phone number must be 10-15 digits"),
  body("role").isIn(["admin", "hr", "employee"]).withMessage("Invalid role"),
  body("designation").trim().notEmpty().withMessage("Designation is required"),
  body("department").trim().notEmpty().withMessage("Department is required"),
  body("joiningDate").isISO8601().withMessage("Invalid date format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const validateLeave = [
  body("leaveType")
    .isIn(["paid", "sick", "unpaid", "casual"])
    .withMessage("Invalid leave type"),
  body("startDate").isISO8601().withMessage("Invalid start date"),
  body("endDate").isISO8601().withMessage("Invalid end date"),
  body("reason")
    .isLength({ min: 10 })
    .withMessage("Reason must be at least 10 characters"),
];

export const validateAttendance = [
  body("status")
    .isIn(["present", "absent", "half-day", "leave"])
    .withMessage("Invalid status"),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

export default handleValidationErrors;
