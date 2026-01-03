import User from "../models/User.js";

/**
 * Generate unique Login ID
 * Algorithm: CompanyInitials + FirstNameInitial + LastNameInitial + Year + SerialNumber
 * Example: "GO" + "J" + "D" + "2025" + "001" = "GOJD2025001"
 */
export const generateLoginId = async (companyName, firstName, lastName) => {
  try {
    // Extract first 2 characters from company name
    const companyInitials = companyName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    // Extract first character from first and last name
    const nameInitials = (firstName[0] + lastName[0]).toUpperCase();

    // Get current year
    const year = new Date().getFullYear();

    // Query for existing login IDs with same prefix for this year
    const pattern = `^${companyInitials}${nameInitials}${year}`;
    const regex = new RegExp(pattern);

    const existingUsers = await User.find({
      loginId: regex,
    }).sort({ loginId: -1 });

    let serial = 1;
    if (existingUsers.length > 0) {
      const lastLoginId = existingUsers[0].loginId;
      const lastSerial = parseInt(
        lastLoginId.substring(lastLoginId.length - 3)
      );
      serial = lastSerial + 1;
    }

    // Pad serial to 3 digits
    const paddedSerial = String(serial).padStart(3, "0");

    // Combine all parts
    const loginId = `${companyInitials}${nameInitials}${year}${paddedSerial}`;

    return loginId;
  } catch (error) {
    throw new Error(`Failed to generate login ID: ${error.message}`);
  }
};

/**
 * Validate login ID format
 */
export const validateLoginIdFormat = (loginId) => {
  const pattern = /^[A-Z]{4}\d{4}\d{3}$/;
  return pattern.test(loginId);
};

/**
 * Extract year from login ID
 */
export const extractYearFromLoginId = (loginId) => {
  if (!validateLoginIdFormat(loginId)) {
    return null;
  }
  return parseInt(loginId.substring(4, 8));
};

export default generateLoginId;
