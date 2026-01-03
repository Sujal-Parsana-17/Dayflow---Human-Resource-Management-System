import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: [true, "User ID is required"],
    },
    personalInfo: {
      firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
      },
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: {
          type: String,
          default: "India",
        },
      },
      profilePicture: String,
    },
    companyInfo: {
      companyName: {
        type: String,
        required: [true, "Company name is required"],
      },
      companyLogo: String,
    },
    jobDetails: {
      designation: String,
      department: String,
      joiningDate: {
        type: Date,
        default: Date.now,
      },
      employmentType: {
        type: String,
        enum: ["full-time", "part-time", "contract"],
        default: "full-time",
      },
      reportingTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    },
    documents: [
      {
        type: String,
        fileName: String,
        filePath: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    leaveBalance: {
      paidLeave: {
        type: Number,
        default: 12,
      },
      sickLeave: {
        type: Number,
        default: 6,
      },
      unpaidLeave: {
        type: Number,
        default: 0,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Populate user details
employeeSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: "userId",
    select: "loginId email role name",
  });
  next();
});

export default mongoose.model("Employee", employeeSchema);
