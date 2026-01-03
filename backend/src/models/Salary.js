import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      unique: true,
      required: [true, "Employee ID is required"],
    },
    salaryStructure: {
      basicSalary: {
        type: Number,
        required: [true, "Basic salary is required"],
        min: [0, "Basic salary cannot be negative"],
      },
      hra: {
        type: Number,
        default: 0,
      },
      da: {
        type: Number,
        default: 0,
      },
      medicalAllowance: {
        type: Number,
        default: 0,
      },
      performanceBonus: {
        type: Number,
        default: 0,
      },
      otherAllowances: {
        type: Number,
        default: 0,
      },
    },
    deductions: {
      providentFund: {
        type: Number,
        default: 0,
      },
      professionalTax: {
        type: Number,
        default: 0,
      },
      incomeTax: {
        type: Number,
        default: 0,
      },
      otherDeductions: {
        type: Number,
        default: 0,
      },
    },
    grossSalary: Number,
    netSalary: Number,
    effectiveFrom: {
      type: Date,
      default: Date.now,
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Calculate gross and net salary before saving
salarySchema.pre("save", function (next) {
  const {
    basicSalary,
    hra,
    da,
    medicalAllowance,
    performanceBonus,
    otherAllowances,
  } = this.salaryStructure;
  const { providentFund, professionalTax, incomeTax, otherDeductions } =
    this.deductions;

  const totalAllowances =
    (basicSalary || 0) +
    (hra || 0) +
    (da || 0) +
    (medicalAllowance || 0) +
    (performanceBonus || 0) +
    (otherAllowances || 0);

  const totalDeductions =
    (providentFund || 0) +
    (professionalTax || 0) +
    (incomeTax || 0) +
    (otherDeductions || 0);

  this.grossSalary = totalAllowances;
  this.netSalary = totalAllowances - totalDeductions;

  next();
});

// Virtual fields
salarySchema.virtual("totalAllowances").get(function () {
  return (
    this.salaryStructure.basicSalary +
    this.salaryStructure.hra +
    this.salaryStructure.da +
    this.salaryStructure.medicalAllowance +
    this.salaryStructure.performanceBonus +
    this.salaryStructure.otherAllowances
  );
});

salarySchema.virtual("totalDeductions").get(function () {
  return (
    this.deductions.providentFund +
    this.deductions.professionalTax +
    this.deductions.incomeTax +
    this.deductions.otherDeductions
  );
});

salarySchema.set("toJSON", { virtuals: true });

export default mongoose.model("Salary", salarySchema);
