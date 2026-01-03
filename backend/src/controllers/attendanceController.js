import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import { parsePagination } from "../utils/helpers.js";

/**
 * Get attendance records
 */
export const getAttendance = async (req, res, next) => {
  try {
    const {
      employeeId,
      startDate,
      endDate,
      status,
      page = 1,
      limit = 10,
    } = req.query;
    const { skip } = parsePagination({ page, limit });

    let query = {};

    // If user is employee, they can only see their own attendance
    if (req.user.role === "employee") {
      const employee = await Employee.findOne({ userId: req.userId });
      query.employeeId = employee._id;
    } else if (employeeId) {
      query.employeeId = employeeId;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    if (status) {
      query.status = status;
    }

    const attendance = await Attendance.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("employeeId", "personalInfo")
      .sort({ date: -1 });

    const total = await Attendance.countDocuments(query);

    // Calculate summary
    const summary = {
      present: await Attendance.countDocuments({ ...query, status: "present" }),
      absent: await Attendance.countDocuments({ ...query, status: "absent" }),
      halfDay: await Attendance.countDocuments({
        ...query,
        status: "half-day",
      }),
      leave: await Attendance.countDocuments({ ...query, status: "leave" }),
    };

    res.json({
      attendance,
      total,
      pages: Math.ceil(total / limit),
      summary,
      message: "Attendance retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get attendance for specific employee by month
 */
export const getEmployeeAttendance = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const {
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
    } = req.query;

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

    // Get first and last day of month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendance = await Attendance.find({
      employeeId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: 1 });

    const stats = {
      present: attendance.filter((a) => a.status === "present").length,
      absent: attendance.filter((a) => a.status === "absent").length,
      halfDay: attendance.filter((a) => a.status === "half-day").length,
      leave: attendance.filter((a) => a.status === "leave").length,
    };

    res.json({
      attendance,
      monthlyStats: stats,
      message: "Employee attendance retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Check-in
 */
export const checkIn = async (req, res, next) => {
  try {
    const { employeeId } = req.body;

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

    // Check if already checked in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: today,
    });

    if (existingAttendance && existingAttendance.checkInTime) {
      return res.status(400).json({
        success: false,
        message: "Already checked in today",
      });
    }

    let attendance;
    if (existingAttendance) {
      attendance = existingAttendance;
    } else {
      attendance = new Attendance({
        employeeId,
        date: today,
        status: "present",
      });
    }

    attendance.checkInTime = new Date();
    await attendance.save();

    res.json({
      attendance,
      message: "Checked in successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Check-out
 */
export const checkOut = async (req, res, next) => {
  try {
    const { employeeId, attendanceId } = req.body;

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

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    if (!attendance.checkInTime) {
      return res.status(400).json({
        success: false,
        message: "Please check in first",
      });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({
        success: false,
        message: "Already checked out",
      });
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    res.json({
      attendance,
      workHours: attendance.workHours,
      message: "Checked out successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark attendance manually (Admin/HR only)
 */
export const markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status, remarks } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "Please provide employeeId, date, and status",
      });
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({
      employeeId,
      date: attendanceDate,
    });

    if (!attendance) {
      attendance = new Attendance({
        employeeId,
        date: attendanceDate,
        status,
        remarks,
        markedBy: req.userId,
      });
    } else {
      attendance.status = status;
      attendance.remarks = remarks;
      attendance.markedBy = req.userId;
    }

    await attendance.save();

    res.status(attendance.isNew ? 201 : 200).json({
      attendance,
      message: "Attendance marked successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update attendance
 */
export const updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      id,
      { status, remarks },
      { new: true, runValidators: true }
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.json({
      attendance,
      message: "Attendance updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get today's attendance summary (Admin/HR only)
 */
export const getTodayAttendance = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAttendance = await Attendance.find({
      date: today,
    }).populate("employeeId", "personalInfo");

    const stats = {
      present: todayAttendance.filter((a) => a.status === "present").length,
      absent: todayAttendance.filter((a) => a.status === "absent").length,
      halfDay: todayAttendance.filter((a) => a.status === "half-day").length,
      onLeave: todayAttendance.filter((a) => a.status === "leave").length,
    };

    res.json({
      present: todayAttendance.filter((a) => a.status === "present"),
      absent: todayAttendance.filter((a) => a.status === "absent"),
      halfDay: todayAttendance.filter((a) => a.status === "half-day"),
      onLeave: todayAttendance.filter((a) => a.status === "leave"),
      stats,
      message: "Today attendance summary retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAttendance,
  getEmployeeAttendance,
  checkIn,
  checkOut,
  markAttendance,
  updateAttendance,
  getTodayAttendance,
};
