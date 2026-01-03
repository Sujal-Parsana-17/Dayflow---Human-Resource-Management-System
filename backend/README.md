# Dayflow HRMS - Backend

Production-ready backend for the Dayflow Human Resource Management System built with Node.js, Express, and MongoDB.

## Features

- ✅ User authentication with JWT
- ✅ Role-based access control (Admin, HR, Employee)
- ✅ Employee management
- ✅ Attendance tracking (check-in/check-out)
- ✅ Leave management with approval workflow
- ✅ Salary structure management
- ✅ Auto-generated login IDs
- ✅ Input validation
- ✅ Error handling
- ✅ API rate limiting
- ✅ Comprehensive logging

## Prerequisites

- Node.js v18+
- MongoDB (local or remote)
- npm or yarn

## Installation

1. **Install dependencies:**

```bash
cd backend
npm install
```

2. **Create environment file:**

```bash
cp .env.example .env
```

3. **Configure MongoDB:**
   Edit `.env` and update `MONGODB_URI`:

```
MONGODB_URI=mongodb://localhost:27017/hrms_dayflow
```

Make sure MongoDB is running:

```bash
# On Windows
mongod

# On Mac/Linux
brew services start mongodb-community
```

## Running the Server

### Development mode (with hot reload):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)

- `POST /signup` - Register new account
- `POST /signin` - Login
- `GET /me` - Get current user (requires auth)
- `POST /logout` - Logout

### Employees (`/api/employees`)

- `GET /` - List all employees (Admin/HR)
- `GET /:id` - Get employee details
- `POST /` - Create employee (Admin/HR)
- `PUT /:id` - Update employee
- `DELETE /:id` - Delete employee (Admin)
- `POST /:id/upload-profile-picture` - Upload profile picture
- `GET /:id/documents` - Get employee documents
- `POST /:id/upload-document` - Upload document

### Attendance (`/api/attendance`)

- `GET /` - List attendance records
- `GET /employee/:employeeId` - Get employee's attendance by month
- `GET /today` - Today's attendance summary (Admin/HR)
- `POST /check-in` - Check in
- `POST /check-out` - Check out
- `POST /mark` - Mark attendance (Admin/HR)
- `PUT /:id` - Update attendance (Admin/HR)

### Leaves (`/api/leaves`)

- `GET /` - List leave requests
- `GET /:id` - Get leave request details
- `POST /` - Apply for leave
- `PUT /:id/approve` - Approve leave (Admin/HR)
- `PUT /:id/reject` - Reject leave (Admin/HR)
- `DELETE /:id` - Delete leave
- `GET /balance/:employeeId` - Get leave balance
- `GET /pending` - Get pending leaves (Admin/HR)

### Salaries (`/api/salaries`)

- `GET /` - List all salaries (Admin/HR)
- `GET /:employeeId` - Get employee salary
- `POST /` - Create salary structure (Admin/HR)
- `PUT /:employeeId` - Update salary (Admin/HR)
- `DELETE /:employeeId` - Delete salary (Admin)

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── uploads/            # Uploaded files
├── .env                # Environment variables
├── .env.example        # Example env file
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies
└── README.md          # This file
```

## Environment Variables

```
NODE_ENV=development        # development/production
PORT=5000                  # Server port
MONGODB_URI=...           # MongoDB connection string
JWT_SECRET=...            # JWT signing secret
JWT_EXPIRE=7d             # JWT expiration time
CORS_ORIGIN=...           # CORS allowed origin
MAX_FILE_SIZE=...         # Max upload file size (bytes)
UPLOAD_PATH=./uploads     # Upload directory
RATE_LIMIT_MAX=100        # Rate limit max requests
RATE_LIMIT_WINDOW_MS=...  # Rate limit window (ms)
```

## Testing with Postman/Insomnia

1. **Sign up:**

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

2. **Sign in:**

```
POST http://localhost:5000/api/auth/signin
Content-Type: application/json

{
  "identifier": "john@example.com",
  "password": "password123"
}
```

3. **Use the token:**

```
Authorization: Bearer <token_from_signin_response>
```

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

## Database Schema

### User

- loginId (unique)
- email (unique)
- password (hashed)
- name
- phone
- role (admin/hr/employee)
- companyName
- isActive
- createdAt/updatedAt

### Employee

- userId (unique reference to User)
- personalInfo (firstName, lastName, email, phone, address, etc.)
- companyInfo (companyName, companyLogo)
- jobDetails (designation, department, joiningDate, etc.)
- leaveBalance
- isActive
- createdAt/updatedAt

### Attendance

- employeeId
- date (unique with employeeId)
- status (present/absent/half-day/leave)
- checkInTime
- checkOutTime
- workHours (calculated)
- createdAt/updatedAt

### Leave

- employeeId
- leaveType (paid/sick/unpaid/casual)
- startDate, endDate
- numberOfDays (calculated)
- reason
- status (pending/approved/rejected)
- appliedDate
- createdAt/updatedAt

### Salary

- employeeId (unique)
- salaryStructure (basicSalary, hra, da, etc.)
- deductions (pf, tax, etc.)
- grossSalary (calculated)
- netSalary (calculated)
- createdAt/updatedAt

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control
- Input validation
- CORS enabled
- Rate limiting
- Helmet for security headers
- Environment variables for secrets

## Development

### Adding a new endpoint

1. Create controller in `/controllers`
2. Create route in `/routes`
3. Import and register route in `app.js`
4. Add validation middleware if needed
5. Test with Postman/Insomnia

### Code style

- Use async/await instead of callbacks
- Validate all inputs
- Use proper error handling
- Add comments for complex logic
- Follow REST conventions

## Troubleshooting

### MongoDB connection error

- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network connectivity

### Token expired

- Request a new token by signing in again
- Implement token refresh endpoint if needed

### CORS errors

- Verify `CORS_ORIGIN` in `.env`
- Frontend URL should match CORS_ORIGIN

## Future Enhancements

- [ ] Email notifications via SMTP
- [ ] File upload to cloud storage (AWS S3)
- [ ] Advanced reporting and analytics
- [ ] Payroll processing
- [ ] Performance appraisal system
- [ ] Biometric integration
- [ ] Mobile app backend

## License

ISC

## Support

For issues, feature requests, or contributions, please refer to the main project repository.
