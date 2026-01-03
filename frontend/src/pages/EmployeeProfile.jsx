import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { useParams, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Briefcase, Calendar, DollarSign, MapPin, Edit } from 'lucide-react'
import { formatDate } from '@utils/helpers'

function EmployeeProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.id === id)
    setEmployee(found)
  }, [id])

  if (!employee) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Employee not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Profile</h1>
            <p className="text-gray-600 mt-1">View employee details</p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate(`/employees/${id}/edit`)}
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-odoo-primary to-odoo-primary-light flex items-center justify-center text-white text-3xl font-bold">
                {employee.name?.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                <p className="text-gray-600">{employee.designation}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-odoo-primary/10 text-odoo-primary uppercase">
                    {employee.role}
                  </span>
                  <span className="text-sm text-gray-500">Login ID: <span className="font-mono text-odoo-primary">{employee.loginId}</span></span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Personal Information */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{employee.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{employee.phone}</p>
                </div>
              </div>
              {employee.address && (
                <div className="flex items-start space-x-3 md:col-span-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{employee.address}</p>
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Job Details */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="text-gray-900">{employee.designation}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="text-gray-900">{employee.department}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Joining Date</p>
                  <p className="text-gray-900">{formatDate(employee.joiningDate)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="text-gray-900">${employee.salary?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="text-gray-900">{employee.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="text-gray-900">{formatDate(employee.createdAt)}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeProfile
