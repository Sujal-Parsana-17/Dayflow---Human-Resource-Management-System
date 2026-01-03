import Employee from "../models/Employee.js";
import User from "../models/User.js";
import { generateLoginId } from "../utils/generateLoginId.js";
import { generatePassword } from "../utils/passwordGenerator.js";
import { parsePagination } from "../utils/helpers.js";
import { sendWelcomeEmail } from "../utils/emailService.js";

/**
 * Get all employees (Admin/HR only)
 */
export const getAllEmployees = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "", department = "" } = req.query;
    const { skip } = parsePagination({ page, limit });

    let query = {};

    if (search) {
      query.$or = [
        { "personalInfo.firstName": { $regex: search, $options: "i" } },
        { "personalInfo.lastName": { $regex: search, $options: "i" } },
        { "personalInfo.email": { $regex: search, $options: "i" } },
      ];
    }

    if (department) {
      query["jobDetails.department"] = department;
    }

    console.log('📊 Fetching employees with query:', query);

    const employees = await Employee.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("userId", "loginId email role name");

    console.log(`📊 Found ${employees.length} employees out of total: ${await Employee.countDocuments(query)}`);

    const total = await Employee.countDocuments(query);
    const pages = Math.ceil(total / limit);

    res.json({
      success: true,
      employees,
      total,
      pages,
      currentPage: parseInt(page),
      message: "Employees retrieved successfully",
    });
  } catch (error) {
    console.error('❌ Error fetching employees:', error);
    next(error);
  }
};

/**
 * Get single employee by ID
 */
export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id).populate(
      "userId",
      "loginId email role name"
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      employee,
      message: "Employee retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new employee (Admin/HR only)
 */
export const createEmployee = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      role,
      designation,
      department,
      joiningDate,
      salary,
      address,
      companyName,
      companyLogo,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !role ||
      !designation ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Auto-generate secure password
    const password = generatePassword();
    console.log(`🔑 Generated password for ${email}: ${password}`);

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`❌ Duplicate email attempt: ${email}`);
      return res.status(400).json({
        success: false,
        message: `This email (${email}) is already registered. Please use a different email address.`,
      });
    }

    // Split name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : nameParts[0];

    // Get company name from logged-in user
    const adminUser = await User.findById(req.userId);
    const company = companyName || adminUser.companyName;

    // Generate login ID
    const loginId = await generateLoginId(company, firstName, lastName);

    // Create user with password change required flag
    const user = new User({
      loginId,
      email,
      password,
      name,
      phone,
      companyName: company,
      companyLogo,
      role,
      employeeId: null,
      passwordChangeRequired: true,
      firstLogin: true,
    });

    await user.save();
    console.log(`✅ User created with ID: ${user._id}`);

    // Create employee record
    // Handle address - if string, convert to object format
    let addressObj = undefined;
    if (address && typeof address === 'string') {
      addressObj = {
        street: address,
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      };
    } else if (address && typeof address === 'object') {
      addressObj = address;
    }

    console.log('📝 Creating employee record...');
    const employee = new Employee({
      userId: user._id,
      personalInfo: {
        firstName,
        lastName,
        email,
        phone,
        ...(addressObj && { address: addressObj }),
      },
      companyInfo: {
        companyName: company,
        companyLogo,
      },
      jobDetails: {
        designation,
        department,
        joiningDate: joiningDate || new Date(),
      },
    });

    await employee.save();
    console.log(`✅ Employee created with ID: ${employee._id}`);

    // Link employee to user
    user.employeeId = employee._id;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(email, loginId, password, company);

    res.status(201).json({
      success: true,
      employee,
      loginCredentials: {
        loginId,
        password,
        message: "Please share these credentials securely with the employee",
      },
      message: "Employee created successfully. Password has been auto-generated.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update employee
 */
export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("userId", "loginId email role name");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      employee,
      message: "Employee updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete employee (Admin only)
 */
export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Delete associated user
    await User.findByIdAndDelete(employee.userId);

    // Delete employee
    await Employee.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload profile picture
 */
export const uploadProfilePicture = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const employee = await Employee.findByIdAndUpdate(
      id,
      { "personalInfo.profilePicture": `/uploads/${req.file.filename}` },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      profilePictureUrl: `/uploads/${req.file.filename}`,
      message: "Profile picture uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get employee documents
 */
export const getDocuments = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      documents: employee.documents || [],
      message: "Documents retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload document
 */
export const uploadDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Document type is required",
      });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const document = {
      type,
      fileName: req.file.originalname,
      filePath: `/uploads/${req.file.filename}`,
      uploadedAt: new Date(),
    };

    employee.documents.push(document);
    await employee.save();

    res.json({
      document,
      message: "Document uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadProfilePicture,
  getDocuments,
  uploadDocument,
};
