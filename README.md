<div align="center">

# 🌊 Dayflow

### Human Resource Management System

**Every workday, perfectly aligned.**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [User Roles](#-user-roles)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

Dayflow is a comprehensive Human Resource Management System (HRMS) designed to digitize and streamline core HR operations. The system provides a unified platform for employee onboarding, profile management, attendance tracking, leave management, payroll visibility, and approval workflows for administrators and HR officers.

### Purpose

The system aims to:

- Eliminate manual HR processes and paperwork
- Provide real-time visibility into employee data
- Streamline approval workflows
- Enhance communication between employees and HR
- Ensure data accuracy and compliance

---

## ✨ Features

### 🔐 Authentication & Authorization

- **Secure Sign Up/Sign In** with email verification
- **Password Security** with encryption and security rules
- **Role-based Access Control** (Admin/HR vs Employee)
- **JWT Token-based Authentication**

### 👥 Employee Management

- **Profile Management**
  - View and edit personal details
  - Upload and manage documents
  - Profile picture management
  - Job details and salary structure
- **Role-based Permissions**
  - Employees can edit limited fields (address, phone)
  - Admins can edit all employee details

### 📅 Attendance Management

- **Real-time Tracking**
  - Daily check-in/check-out functionality
  - Daily and weekly attendance views
  - Status tracking (Present, Absent, Half-day, Leave)
- **Access Control**
  - Employees view their own attendance
  - Admins view all employee attendance

### 🏖️ Leave & Time-Off Management

- **Employee Leave Application**
  - Multiple leave types (Paid, Sick, Unpaid)
  - Date range selection
  - Remarks and notes
  - Real-time status tracking (Pending, Approved, Rejected)
- **Admin Leave Approval**
  - View all leave requests
  - Approve/reject with comments
  - Immediate reflection in employee records

### 💰 Payroll/Salary Management

- **Employee View**
  - Read-only access to salary structure
  - View salary slips and history
- **Admin Control**
  - View and update payroll for all employees
  - Salary structure management
  - Payroll accuracy verification

### 📊 Dashboard & Analytics

- **Employee Dashboard**
  - Quick-access cards (Profile, Attendance, Leave)
  - Recent activity alerts
  - Personal statistics
- **Admin/HR Dashboard**
  - Employee list overview
  - Attendance records
  - Leave approval queue
  - Analytics and reports

### 🔔 Notifications & Alerts

- Email notifications for key events
- Real-time alerts for leave requests
- System notifications for status updates

---

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js 4.18
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs
- **Validation:** Express-validator
- **Security:** Helmet, CORS, Express-rate-limit
- **File Upload:** Multer
- **Logging:** Morgan

### Frontend

- **Framework:** React 19.2
- **Build Tool:** Vite (Rolldown)
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS 3.4
- **Form Handling:** React Hook Form + Yup validation
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Date Handling:** date-fns

### Development Tools

- **Backend Dev Server:** Nodemon
- **Frontend Dev Server:** Vite
- **CSS Processing:** PostCSS + Autoprefixer

---

## 📁 Project Structure

```
Dayflow-HRMS/
├── backend/                    # Backend API server
│   ├── src/
│   │   ├── config/            # Database and app configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Helper functions
│   │   ├── app.js             # Express app setup
│   │   └── server.js          # Server entry point
│   ├── uploads/               # File upload directory
│   └── package.json
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── assets/            # Static assets
│   │   ├── components/        # React components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── common/        # Reusable UI components
│   │   │   ├── dashboard/     # Dashboard components
│   │   │   └── landing/       # Landing page components
│   │   ├── context/           # React Context (Auth)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   ├── routes/            # Route configuration
│   │   ├── services/          # API services
│   │   ├── utils/             # Helper functions
│   │   └── main.jsx           # App entry point
│   ├── public/                # Public assets
│   └── package.json
│
├── README.md                   # Project documentation
├── SETUP_GUIDE.md             # Setup instructions
└── package.json               # Root package file
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MongoDB** (local or cloud instance)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sujal-Parsana-17/Dayflow---Human-Resource-Management-System.git
   cd Dayflow---Human-Resource-Management-System
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory:

   ```env
   NODE_ENV=development
   PORT=5000

   # Database
   MONGODB_URI=mongodb://localhost:27017/dayflow-hrms

   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d

   # Email Configuration (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password

   # Frontend URL
   FRONTEND_URL=http://localhost:5173
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```

2. **Start Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   Backend will run on `http://localhost:5000`

3. **Start Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - Sign up or sign in to start using Dayflow

### Building for Production

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

**Backend:**

```bash
cd backend
npm start
```

For detailed setup instructions, refer to [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

## 👤 User Roles

### Employee

Employees have access to:

- ✅ Personal profile (view and limited edit)
- ✅ Attendance tracking (check-in/check-out)
- ✅ Leave application and status tracking
- ✅ Salary structure (read-only)
- ✅ Personal dashboard with activity feed

### Admin / HR Officer

Admins have all employee permissions plus:

- ✅ Manage all employee profiles
- ✅ View and manage attendance for all employees
- ✅ Approve/reject leave requests
- ✅ Manage payroll and salary structures
- ✅ Access to analytics and reports
- ✅ System-wide configuration

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Authentication

- `POST /auth/signup` - Register new user
- `POST /auth/signin` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

#### Employees

- `GET /employees` - Get all employees (Admin)
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee (Admin)
- `PUT /employees/:id` - Update employee (Admin)
- `DELETE /employees/:id` - Delete employee (Admin)

#### Attendance

- `GET /attendance` - Get attendance records
- `POST /attendance/checkin` - Check in
- `POST /attendance/checkout` - Check out
- `GET /attendance/me` - Get my attendance
- `GET /attendance/:employeeId` - Get employee attendance (Admin)

#### Leave

- `GET /leave` - Get all leave requests
- `POST /leave` - Apply for leave
- `PUT /leave/:id` - Update leave request (Admin)
- `GET /leave/me` - Get my leave requests

#### Salary

- `GET /salary` - Get all salaries (Admin)
- `GET /salary/:employeeId` - Get employee salary
- `PUT /salary/:employeeId` - Update salary (Admin)

---

## 📸 Screenshots

_Coming soon..._

---

## 🤝 Contributing

We welcome contributions to Dayflow! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

- **Repository:** [GitHub](https://github.com/Sujal-Parsana-17/Dayflow---Human-Resource-Management-System)
- **Issues:** [Report Bug](https://github.com/Sujal-Parsana-17/Dayflow---Human-Resource-Management-System/issues)
- **Author:** Dayflow Team

---

<div align="center">

### Made with ❤️ by the Dayflow Team

**Every workday, perfectly aligned.**

⭐ Star us on GitHub if you find this project useful!

</div>
