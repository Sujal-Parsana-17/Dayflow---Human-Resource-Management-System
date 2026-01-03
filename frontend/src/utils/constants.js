// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  HR: 'hr',
  EMPLOYEE: 'employee',
}

// Leave Types
export const LEAVE_TYPES = {
  PAID: 'paid',
  SICK: 'sick',
  UNPAID: 'unpaid',
  CASUAL: 'casual',
}

// Leave Status
export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  HALF_DAY: 'half-day',
  LEAVE: 'leave',
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  EMPLOYEES: {
    LIST: '/employees',
    DETAIL: (id) => `/employees/${id}`,
    CREATE: '/employees',
    UPDATE: (id) => `/employees/${id}`,
    DELETE: (id) => `/employees/${id}`,
  },
  ATTENDANCE: {
    LIST: '/attendance',
    CHECKIN: '/attendance/checkin',
    CHECKOUT: '/attendance/checkout',
    EMPLOYEE: (id) => `/attendance/employee/${id}`,
  },
  LEAVE: {
    LIST: '/leave',
    CREATE: '/leave',
    UPDATE: (id) => `/leave/${id}`,
    APPROVE: (id) => `/leave/${id}/approve`,
    REJECT: (id) => `/leave/${id}/reject`,
  },
}

// Status Colors (for badges)
export const STATUS_COLORS = {
  pending: 'bg-warning text-gray-900',
  approved: 'bg-success text-white',
  rejected: 'bg-danger text-white',
  present: 'bg-success text-white',
  absent: 'bg-danger text-white',
  'half-day': 'bg-warning text-gray-900',
  leave: 'bg-info text-white',
}
