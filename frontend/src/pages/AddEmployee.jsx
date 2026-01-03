import React, { useState } from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { User, Mail, Phone, Briefcase, Calendar, DollarSign, Upload, AlertCircle } from 'lucide-react'
import { generateLoginId } from '@utils/helpers'
import { USER_ROLES } from '@utils/constants'

const addEmployeeSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup.string().required('Phone is required').matches(/^[0-9]{10,15}$/, 'Phone must be 10-15 digits'),
  role: yup.string().required('Role is required'),
  designation: yup.string().required('Designation is required'),
  department: yup.string().required('Department is required'),
  joiningDate: yup.string().required('Joining date is required'),
  salary: yup.number().required('Salary is required').positive('Salary must be positive'),
  address: yup.string(),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})

function AddEmployee() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addEmployeeSchema),
  })

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setServerError('')

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if email already exists
      if (users.some(u => u.email === data.email)) {
        setServerError('Email already exists')
        return
      }

      // Get company name from current user
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const companyName = currentUser.companyName || 'Company'

      // Generate login ID
      const loginId = generateLoginId(companyName, users.length + 1)

      // Create new employee
      const newEmployee = {
        id: Date.now().toString(),
        loginId,
        ...data,
        companyName,
        createdAt: new Date().toISOString(),
      }

      users.push(newEmployee)
      localStorage.setItem('users', JSON.stringify(users))

      alert(`Employee added successfully!\nLogin ID: ${loginId}\nPassword: ${data.password}`)
      navigate('/employees')
    } catch (error) {
      setServerError(error.message || 'Failed to add employee')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New Employee</h1>
          <p className="text-gray-600 mt-1">Create a new employee account</p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-danger mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-danger">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Full Name *"
                  placeholder="Enter full name"
                  icon={<User className="w-5 h-5" />}
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="email@example.com"
                  icon={<Mail className="w-5 h-5" />}
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  label="Phone Number *"
                  placeholder="1234567890"
                  icon={<Phone className="w-5 h-5" />}
                  error={errors.phone?.message}
                  {...register('phone')}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Role *
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    {...register('role')}
                  >
                    <option value="">Select Role</option>
                    <option value={USER_ROLES.EMPLOYEE}>Employee</option>
                    <option value={USER_ROLES.HR}>HR</option>
                    <option value={USER_ROLES.ADMIN}>Admin</option>
                  </select>
                  {errors.role && <p className="mt-1.5 text-sm text-danger">{errors.role.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Address
                </label>
                <textarea
                  rows="3"
                  placeholder="Enter full address"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                  {...register('address')}
                />
              </div>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Job Details</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Designation *"
                  placeholder="e.g., Software Engineer"
                  icon={<Briefcase className="w-5 h-5" />}
                  error={errors.designation?.message}
                  {...register('designation')}
                />
                <Input
                  label="Department *"
                  placeholder="e.g., Engineering"
                  icon={<Briefcase className="w-5 h-5" />}
                  error={errors.department?.message}
                  {...register('department')}
                />
                <Input
                  label="Joining Date *"
                  type="date"
                  icon={<Calendar className="w-5 h-5" />}
                  error={errors.joiningDate?.message}
                  {...register('joiningDate')}
                />
                <Input
                  label="Salary *"
                  type="number"
                  placeholder="50000"
                  icon={<DollarSign className="w-5 h-5" />}
                  error={errors.salary?.message}
                  {...register('salary')}
                />
              </div>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Account Credentials</h2>
            </CardHeader>
            <CardBody>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> A unique Login ID will be generated automatically. 
                  Share these credentials with the employee after creation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Password *"
                  type="password"
                  placeholder="Enter initial password"
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>
            </CardBody>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/employees')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Add Employee
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default AddEmployee
