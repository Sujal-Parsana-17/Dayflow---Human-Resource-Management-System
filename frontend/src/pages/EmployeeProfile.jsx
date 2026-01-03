import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { User, Mail, Phone, Briefcase, Calendar, DollarSign, MapPin, Edit, FileText, Download, Upload } from 'lucide-react'
import { formatDate, getInitials } from '@utils/helpers'
import { useAuth } from '@hooks/useAuth'

function EmployeeProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAdmin, isHR } = useAuth()
  const [employee, setEmployee] = useState(null)
  const isViewOnly = location.state?.viewOnly !== false // Default to view-only unless explicitly set

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

  const canEdit = (isAdmin || isHR) && !isViewOnly

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Profile</h1>
            <p className="text-gray-600 mt-1">View employee details</p>
          </div>
          {canEdit && (
            <Button
              variant="primary"
              onClick={() => navigate(`/employees/${id}/edit`)}
            >
              <Edit className="h-5 w-5 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Header with Picture */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-odoo-primary to-odoo-primary-light flex items-center justify-center text-white text-4xl font-bold">
                  {getInitials(employee.name)}
                </div>
                {employee.profilePicture && (
                  <img 
                    src={employee.profilePicture} 
                    alt={employee.name}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                <p className="text-gray-600 text-lg">{employee.designation || employee.role}</p>
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

        {/* Personal Details */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{employee.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 font-medium">{employee.phone || 'N/A'}</p>
                </div>
              </div>
              {employee.address && (
                <div className="flex items-start space-x-3 md:col-span-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900 font-medium">{employee.address}</p>
                  </div>
                </div>
              )}
              {employee.dateOfBirth && (
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-gray-900 font-medium">{formatDate(employee.dateOfBirth)}</p>
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
                  <p className="text-gray-900 font-medium">{employee.designation || employee.role || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="text-gray-900 font-medium">{employee.department || 'N/A'}</p>
                </div>
              </div>
              {employee.manager && (
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Manager</p>
                    <p className="text-gray-900 font-medium">{employee.manager}</p>
                  </div>
                </div>
              )}
              {employee.location && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900 font-medium">{employee.location}</p>
                  </div>
                </div>
              )}
              {employee.joiningDate && (
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Joining Date</p>
                    <p className="text-gray-900 font-medium">{formatDate(employee.joiningDate)}</p>
                  </div>
                </div>
              )}
              {employee.employeeId && (
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p className="text-gray-900 font-medium">{employee.employeeId}</p>
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Salary Structure */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Salary Structure</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {employee.salary ? (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Basic Salary</p>
                    <p className="text-gray-900 font-medium text-lg">${employee.salary?.toLocaleString() || 'N/A'}</p>
                  </div>
                  {employee.currency && (
                    <div>
                      <p className="text-sm text-gray-500">Currency</p>
                      <p className="text-gray-900 font-medium">{employee.currency}</p>
                    </div>
                  )}
                  {employee.salaryBreakdown && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500 mb-2">Salary Breakdown</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-2">
                          {Object.entries(employee.salaryBreakdown).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                              <span className="text-gray-900 font-medium">${value?.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="md:col-span-2 text-center py-4 text-gray-500">
                  <DollarSign className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Salary information not available</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Documents */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
          </CardHeader>
          <CardBody>
            {employee.documents && employee.documents.length > 0 ? (
              <div className="space-y-3">
                {employee.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name || `Document ${index + 1}`}</p>
                        <p className="text-xs text-gray-500">{doc.type || 'Document'}</p>
                      </div>
                    </div>
                    {doc.url && (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-odoo-primary hover:bg-odoo-primary/10 rounded-lg transition-colors"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No documents uploaded</p>
              </div>
            )}
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
                <p className="text-gray-900 font-medium">{employee.companyName || 'N/A'}</p>
              </div>
              {employee.createdAt && (
                <div>
                  <p className="text-sm text-gray-500">Account Created</p>
                  <p className="text-gray-900 font-medium">{formatDate(employee.createdAt)}</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeProfile
