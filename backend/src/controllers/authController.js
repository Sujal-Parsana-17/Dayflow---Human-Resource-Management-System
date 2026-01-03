import User from "../models/User.js";
import Employee from "../models/Employee.js";
import { generateLoginId } from "../utils/generateLoginId.js";
import { sendWelcomeEmail } from "../utils/emailService.js";

/**
 * Sign Up - Create new user account
 */
export const signup = async (req, res, next) => {
  try {
    console.log('Signup request received:', {
      body: req.body,
      headers: req.headers['content-type']
    });

    const {
      companyName,
      name,
      email,
      phone,
      password,
      confirmPassword,
      companyLogo,
    } = req.body;

    // Validate input
    if (!companyName || !name || !email || !phone || !password) {
      console.log('Missing required fields:', {
        companyName: !!companyName,
        name: !!name,
        email: !!email,
        phone: !!phone,
        password: !!password
      });
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Split name into first and last name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : nameParts[0];

    // Generate unique login ID
    const loginId = await generateLoginId(companyName, firstName, lastName);

    // Determine role: first user is admin, others are employees
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "employee";

    // Create user
    const user = new User({
      loginId,
      email,
      password,
      name,
      phone,
      companyName,
      companyLogo: companyLogo || null,
      role,
    });

    await user.save();

    // Create employee record
    const employee = new Employee({
      userId: user._id,
      personalInfo: {
        firstName,
        lastName,
        email,
        phone,
      },
      companyInfo: {
        companyName,
        companyLogo: companyLogo || null,
      },
      jobDetails: {
        joiningDate: new Date(),
      },
    });

    await employee.save();

    // Link employee to user
    user.employeeId = employee._id;
    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    // Send welcome email (logs to console)
    await sendWelcomeEmail(email, loginId, password, companyName);

    // Return response
    res.status(201).json({
      user: user.toJSON(),
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Sign In - Authenticate user
 */
export const signin = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email/login ID and password",
      });
    }

    // Find user by email or loginId
    const user = await User.findOne({
      $or: [{ email: identifier }, { loginId: identifier }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is inactive",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    // Get employee details
    const employee = await Employee.findOne({ userId: user._id });

    res.json({
      user: user.toJSON(),
      token,
      employee,
      message: "Signed in successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const employee = await Employee.findOne({ userId: req.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      user: user.toJSON(),
      employee,
      message: "User retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout
 */
export const logout = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { signup, signin, getCurrentUser, logout };
