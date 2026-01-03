/**
 * Helper utility functions
 */

/**
 * Calculate days between two dates (inclusive)
 */
export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end date
};

/**
 * Format date to ISO string
 */
export const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0];
};

/**
 * Check if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Check if phone is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ""));
};

/**
 * Generate random string
 */
export const generateRandomString = (length = 32) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Get initials from name
 */
export const getInitials = (firstName, lastName) => {
  return (firstName[0] + lastName[0]).toUpperCase();
};

/**
 * Check if date is in past
 */
export const isDateInPast = (date) => {
  return new Date(date) < new Date();
};

/**
 * Check if date range is valid
 */
export const isValidDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
};

/**
 * Get month name from number
 */
export const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1];
};

/**
 * Parse pagination query params
 */
export const parsePagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Create response object
 */
export const createResponse = (success, message, data = null) => {
  const response = {
    success,
    message,
  };
  if (data) {
    response.data = data;
  }
  return response;
};

export default {
  calculateDays,
  formatDate,
  isValidEmail,
  isValidPhone,
  generateRandomString,
  truncateText,
  getInitials,
  isDateInPast,
  isValidDateRange,
  getMonthName,
  parsePagination,
  createResponse,
};
