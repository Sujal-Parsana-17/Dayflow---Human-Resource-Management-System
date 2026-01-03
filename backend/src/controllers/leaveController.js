import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";
import { parsePagination, calculateDays } from "../utils/helpers.js";
import {
  sendLeaveApprovalEmail,
  sendLeaveRejectionEmail,
} from "../utils/emailService.js";

/**
 * Get all leave requests
 */
export const getAllLeaves = async (req, res, next) => {
  try {
    const {
      employeeId,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;
    const { skip } = parsePagination({ page, limit });

    let query = {};

    // If user is employee, they can only see their own leaves
    if (req.user.role === "employee") {
      const employee = await Employee.findOne({ userId: req.userId });
      query.employeeId = employee._id;
    } else if (employeeId) {
      query.employeeId = employeeId;
    }

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) {
        query.startDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.startDate.$lte = new Date(endDate);
      }
    }

    const leaves = await Leave.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("employeeId", "personalInfo")
      .sort({ appliedDate: -1 });

    const total = await Leave.countDocuments(query);

    res.json({
      leaves,
      total,
      pages: Math.ceil(total / limit),
      message: "Leaves retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single leave request
 */
export const getLeaveById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate(
      "employeeId",
      "personalInfo"
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    res.json({
      leave,
      message: "Leave retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create leave request
 */
export const createLeave = async (req, res, next) => {
  try {
    const { leaveType, startDate, endDate, reason, attachment } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Get employee
    const employee = await Employee.findOne({ userId: req.userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check leave balance for paid/sick leaves
    if (leaveType === "paid" && employee.leaveBalance.paidLeave <= 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient paid leave balance",
      });
    }

    if (leaveType === "sick" && employee.leaveBalance.sickLeave <= 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient sick leave balance",
      });
    }

    // Create leave
    const leave = new Leave({
      employeeId: employee._id,
      employeeName: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
      leaveType,
      startDate,
      endDate,
      reason,
      attachment,
      status: "pending",
    });

    await leave.save();

    res.status(201).json({
      leave,
      message: "Leave request submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Approve leave
 */
export const approveLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;

    const leave = await Leave.findById(id).populate("employeeId");

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending leaves can be approved",
      });
    }

    // Update leave balance
    const employee = leave.employeeId;
    if (leave.leaveType === "paid") {
      employee.leaveBalance.paidLeave -= leave.numberOfDays;
    } else if (leave.leaveType === "sick") {
      employee.leaveBalance.sickLeave -= leave.numberOfDays;
    } else if (leave.leaveType === "unpaid") {
      employee.leaveBalance.unpaidLeave -= leave.numberOfDays;
    }

    await employee.save();

    // Update leave status
    leave.status = "approved";
    leave.approvalDetails = {
      approvedBy: req.userId,
      approvedDate: new Date(),
      comments,
    };

    await leave.save();

    // Send approval email
    await sendLeaveApprovalEmail(
      employee.personalInfo.email,
      {
        leaveType: leave.leaveType,
        startDate: leave.startDate.toDateString(),
        endDate: leave.endDate.toDateString(),
        numberOfDays: leave.numberOfDays,
      },
      `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`
    );

    res.json({
      leave,
      updatedLeaveBalance: employee.leaveBalance,
      message: "Leave approved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reject leave
 */
export const rejectLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;

    const leave = await Leave.findById(id).populate("employeeId");

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending leaves can be rejected",
      });
    }

    leave.status = "rejected";
    leave.approvalDetails = {
      approvedBy: req.userId,
      approvedDate: new Date(),
      comments: comments || "Leave rejected",
    };

    await leave.save();

    // Send rejection email
    const employee = leave.employeeId;
    await sendLeaveRejectionEmail(
      employee.personalInfo.email,
      {
        leaveType: leave.leaveType,
        startDate: leave.startDate.toDateString(),
        endDate: leave.endDate.toDateString(),
        numberOfDays: leave.numberOfDays,
      },
      `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
      comments || "Leave rejected"
    );

    res.json({
      leave,
      message: "Leave rejected successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete leave (only pending leaves by employee)
 */
export const deleteLeave = async (req, res, next) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    // Only employee can delete their own pending leaves, admin can delete any
    if (req.user.role === "employee") {
      if (leave.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: "Can only delete pending leaves",
        });
      }

      const employee = await Employee.findOne({ userId: req.userId });
      if (leave.employeeId.toString() !== employee._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    }

    await Leave.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get leave balance for employee
 */
export const getLeaveBalance = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    // Verify access
    if (req.user.role === "employee") {
      const employee = await Employee.findOne({ userId: req.userId });
      if (employeeId !== employee._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      leaveBalance: employee.leaveBalance,
      message: "Leave balance retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get pending leaves (Admin/HR only)
 */
export const getPendingLeaves = async (req, res, next) => {
  try {
    const pendingLeaves = await Leave.find({
      status: "pending",
    })
      .populate("employeeId", "personalInfo")
      .sort({ appliedDate: -1 });

    res.json({
      pendingLeaves,
      message: "Pending leaves retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllLeaves,
  getLeaveById,
  createLeave,
  approveLeave,
  rejectLeave,
  deleteLeave,
  getLeaveBalance,
  getPendingLeaves,
};
