import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

/**
 * Get salary by employee ID
 */
export const getSalary = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    // Verify access - employees can only view their own salary
    if (req.user.role === "employee") {
      const employee = await Employee.findOne({ userId: req.userId });
      if (employeeId !== employee._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    }

    const salary = await Salary.findOne({ employeeId }).populate(
      "employeeId",
      "personalInfo"
    );

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: "Salary information not found",
      });
    }

    res.json({
      salary,
      message: "Salary retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all salaries (Admin/HR only)
 */
export const getAllSalaries = async (req, res, next) => {
  try {
    const salaries = await Salary.find()
      .populate("employeeId", "personalInfo")
      .populate("lastUpdatedBy", "name email");

    res.json({
      salaries,
      message: "Salaries retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create salary structure (Admin/HR only)
 */
export const createSalary = async (req, res, next) => {
  try {
    const { employeeId, salaryStructure, deductions } = req.body;

    if (!employeeId || !salaryStructure || !salaryStructure.basicSalary) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide employeeId and salary structure with basicSalary",
      });
    }

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check if salary already exists
    const existingSalary = await Salary.findOne({ employeeId });
    if (existingSalary) {
      return res.status(400).json({
        success: false,
        message: "Salary structure already exists for this employee",
      });
    }

    // Create salary
    const salary = new Salary({
      employeeId,
      salaryStructure,
      deductions: deductions || {},
      lastUpdatedBy: req.userId,
    });

    await salary.save();

    res.status(201).json({
      salary,
      message: "Salary structure created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update salary structure (Admin/HR only)
 */
export const updateSalary = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { salaryStructure, deductions } = req.body;

    const salary = await Salary.findOne({ employeeId });

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: "Salary structure not found",
      });
    }

    // Update fields
    if (salaryStructure) {
      salary.salaryStructure = {
        ...salary.salaryStructure,
        ...salaryStructure,
      };
    }

    if (deductions) {
      salary.deductions = { ...salary.deductions, ...deductions };
    }

    salary.lastUpdatedBy = req.userId;
    salary.effectiveFrom = new Date();

    await salary.save();

    res.json({
      salary,
      message: "Salary structure updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete salary (Admin only)
 */
export const deleteSalary = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const salary = await Salary.findOneAndDelete({ employeeId });

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: "Salary structure not found",
      });
    }

    res.json({
      success: true,
      message: "Salary structure deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getSalary,
  getAllSalaries,
  createSalary,
  updateSalary,
  deleteSalary,
};
