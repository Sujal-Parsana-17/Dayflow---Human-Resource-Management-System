import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee ID is required"],
      index: true,
    },
    employeeName: String,
    leaveType: {
      type: String,
      enum: {
        values: ["paid", "sick", "unpaid", "casual"],
        message: "Leave type must be paid, sick, unpaid, or casual",
      },
      required: [true, "Leave type is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    numberOfDays: Number,
    reason: {
      type: String,
      required: [true, "Reason is required"],
      minlength: [10, "Reason must be at least 10 characters"],
    },
    attachment: String,
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "Status must be pending, approved, or rejected",
      },
      default: "pending",
      index: true,
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    approvalDetails: {
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      approvedDate: Date,
      comments: String,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate number of days before saving
leaveSchema.pre("save", function (next) {
  if (this.startDate && this.endDate) {
    const diffTime = Math.abs(this.endDate - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    this.numberOfDays = diffDays;
  }
  next();
});

export default mongoose.model("Leave", leaveSchema);
