# Dayflow HRMS - Complete Setup Guide

This guide will help you set up and run the complete Dayflow HRMS system (Frontend + Backend).

## Prerequisites

- **Node.js** v18+ - [Download](https://nodejs.org/)
- **MongoDB** - [Download Community Edition](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

## Quick Start

### 1. MongoDB Setup

**Windows:**

```bash
# Download and install MongoDB Community Edition from the link above
# Or using Chocolatey:
choco install mongodb-community

# Start MongoDB
mongod
```

**Mac:**

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Verify MongoDB is running:**

```bash
mongosh
# Should connect successfully
# Type: exit
```

### 2. Backend Setup & Run

```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected output:**

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Dayflow HRMS Backend Server                          ║
║                                                            ║
║   ✅ Server running on: http://localhost:5000            ║
║   ✅ Environment: development                             ║
║   ✅ Database: mongodb://localhost:27017/hrms_dayflow    ║
║                                                            ║
║   📚 API Documentation:                                   ║
║      Base URL: http://localhost:5000/api                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**Backend is now running on:** `http://localhost:5000`

### 3. Frontend Setup & Run

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected output:**

```
➜  Local:   http://localhost:5173/
```

**Frontend is now running on:** `http://localhost:5173`

---

## Testing the System

### Test Flow

1. **Sign Up (Create Account)**

   - Open: `http://localhost:5173/signup`
   - Fill in:
     - Company Name: "Acme Corp"
     - Full Name: "John Doe"
     - Email: "john@example.com"
     - Phone: "9876543210"
     - Password: "password123"
   - Click "Create Account"
   - Expected: Account created, redirected to dashboard

2. **Sign In**

   - Open: `http://localhost:5173/signin`
   - Enter:
     - Email/Login ID: "john@example.com"
     - Password: "password123"
   - Click "Sign In"
   - Expected: Logged in, redirected to dashboard

3. **Test Employee Features**

   - Employee Dashboard: View attendance and leave balance
   - My Attendance: Check in/out and view calendar
   - Apply Leave: Submit leave request
   - My Leaves: View leave requests

4. **Test Admin Features** (if you're admin)
   - Add Employee: Create new employee accounts
   - Employee List: View all employees
   - Attendance Management: Mark attendance
   - Leave Requests: Approve/Reject leaves

---

## API Endpoints Testing

Use **Postman** or **Insomnia** to test the API endpoints:

### Authentication

**Sign Up:**

```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "companyName": "Acme Corp",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Expected Response:**

```json
{
  "user": {
    "_id": "...",
    "loginId": "ACJD2025001",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "admin",
    "companyName": "Acme Corp",
    "createdAt": "2025-01-03T...",
    "updatedAt": "2025-01-03T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Account created successfully"
}
```

**Sign In:**

```
POST http://localhost:5000/api/auth/signin
Content-Type: application/json

{
  "identifier": "john@example.com",
  "password": "password123"
}
```

**Use the token for authenticated requests:**

```
Authorization: Bearer <token_from_response>
```

### Employees

**Get all employees:**

```
GET http://localhost:5000/api/employees
Authorization: Bearer <token>
```

**Create employee:**

```
POST http://localhost:5000/api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543211",
  "role": "employee",
  "designation": "Developer",
  "department": "IT",
  "joiningDate": "2025-01-03",
  "password": "password123"
}
```

### Attendance

**Check In:**

```
POST http://localhost:5000/api/attendance/check-in
Authorization: Bearer <token>
Content-Type: application/json

{
  "employeeId": "<employee_id>"
}
```

**Check Out:**

```
POST http://localhost:5000/api/attendance/check-out
Authorization: Bearer <token>
Content-Type: application/json

{
  "employeeId": "<employee_id>",
  "attendanceId": "<attendance_id>"
}
```

### Leaves

**Apply for leave:**

```
POST http://localhost:5000/api/leaves
Authorization: Bearer <token>
Content-Type: application/json

{
  "leaveType": "paid",
  "startDate": "2025-01-10",
  "endDate": "2025-01-12",
  "reason": "Personal vacation"
}
```

**Approve leave (Admin/HR):**

```
PUT http://localhost:5000/api/leaves/<leave_id>/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "comments": "Approved"
}
```

---

## Project Structure

```
Dayflow---Human-Resource-Management-System/
├── backend/                    # Node.js Express Backend
│   ├── src/
│   │   ├── config/            # Configuration
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Custom middleware
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   ├── app.js            # Express setup
│   │   └── server.js         # Server entry
│   ├── uploads/              # File uploads
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── README.md
│
├── frontend/                   # React Vite Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utilities
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Troubleshooting

### MongoDB Connection Error

**Error:** `connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**

1. Ensure MongoDB is running:

```bash
# Windows
mongod

# Mac
brew services start mongodb-community
```

2. Verify connection:

```bash
mongosh
```

### Backend Won't Start

**Error:** `Port 5000 already in use`

**Solution:**

```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend Can't Connect to Backend

**Error:** `CORS error` or `Failed to fetch`

**Solution:**

1. Ensure backend is running on `http://localhost:5000`
2. Check `.env` file in frontend:

```
VITE_API_URL=http://localhost:5000/api
```

3. Restart frontend dev server

### Sign Up Fails

**Error:** `Email already registered`

**Solution:**

- Use a different email address
- Or delete the database and restart:

```bash
# MongoDB shell
use hrms_dayflow
db.dropDatabase()
```

---

## Important Endpoints & Features

### Authentication

- ✅ Sign Up with auto-generated Login ID
- ✅ Sign In with Email or Login ID
- ✅ JWT token-based authentication
- ✅ Auto logout on token expiry

### Employee Management

- ✅ Create/Edit/Delete employees
- ✅ View all employees
- ✅ Profile picture upload
- ✅ Document upload (ID proof, address proof, etc.)

### Attendance Tracking

- ✅ Check-in/Check-out
- ✅ Auto calculate work hours
- ✅ Manual attendance marking (Admin/HR)
- ✅ Monthly calendar view
- ✅ Attendance summary

### Leave Management

- ✅ Apply for leave (Paid/Sick/Unpaid/Casual)
- ✅ Auto-calculate leave days
- ✅ Leave balance management
- ✅ Approval workflow
- ✅ Leave history

### Salary Management

- ✅ Create salary structure
- ✅ Calculate gross and net salary
- ✅ Manage allowances and deductions
- ✅ View salary (employees read-only)

---

## Development Tips

### Using the API in Frontend

```javascript
// Example: Using authService
import { authService } from "@services/authService";

// Sign up
const response = await authService.signUp(userData);

// Sign in
const response = await authService.signIn(credentials);

// The token is automatically added to all requests
// It's stored in localStorage and added by axios interceptor
```

### Adding New Endpoints

Backend:

1. Create controller in `/src/controllers`
2. Create route in `/src/routes`
3. Import and use in `src/app.js`

Frontend:

1. Add endpoint to `utils/constants.js`
2. Create service method in `/services`
3. Use in components

### Debugging

**Backend:**

```bash
# Check logs in terminal where server is running
# Enable debug mode in .env:
NODE_ENV=development
LOG_LEVEL=debug
```

**Frontend:**

```javascript
// Browser DevTools
F12 → Network tab → Check API calls
F12 → Console → Check errors
```

---

## Next Steps

1. ✅ Backend and Frontend are running
2. ✅ Database is connected
3. Create test accounts and explore features
4. Customize as needed
5. Deploy to production (see deployment guides)

---

## Support & Resources

- **Backend README:** [backend/README.md](backend/README.md)
- **Frontend Issues:** Check console for errors
- **API Issues:** Check Network tab in DevTools
- **Database Issues:** Check MongoDB connection

---

## Running in Production

### Backend Production Setup

```bash
# Set environment
NODE_ENV=production

# Update .env with production values
PORT=5000
MONGODB_URI=<production_mongodb_uri>
JWT_SECRET=<strong_secret_key>
CORS_ORIGIN=<frontend_url>

# Start with process manager (PM2)
npm install -g pm2
pm2 start src/server.js --name "hrms-backend"
```

### Frontend Production Build

```bash
cd frontend
npm run build

# Deploy the 'dist' folder to hosting
```

---

**Congratulations! Your Dayflow HRMS system is now running! 🎉**
