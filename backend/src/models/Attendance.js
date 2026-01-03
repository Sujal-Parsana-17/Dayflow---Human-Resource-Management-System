import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee ID is required"],
      index: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["present", "absent", "half-day", "leave"],
        message: "Status must be present, absent, half-day, or leave",
      },
      required: [true, "Status is required"],
    },
    checkInTime: Date,
    checkOutTime: Date,
    workHours: Number,
    remarks: String,
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique attendance per employee per day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

// Calculate work hours before saving
attendanceSchema.pre("save", function (next) {
  if (this.checkInTime && this.checkOutTime) {
    const diffMs = this.checkOutTime - this.checkInTime;
    const diffHours = diffMs / (1000 * 60 * 60);
    this.workHours = Math.round(diffHours * 100) / 100;
  }
  next();
});

export default mongoose.model("Attendance", attendanceSchema);
