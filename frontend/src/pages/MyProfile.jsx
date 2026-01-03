import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/common/DashboardLayout'
import { Card, CardHeader, CardBody } from '@components/common/Card'
import { useAuth } from '@hooks/useAuth'
import { Edit, FileText, User, DollarSign, Plus, X } from 'lucide-react'
import { getInitials } from '@utils/helpers'

function MyProfile() {
  const { user, updateUser, isAdmin, isHR } = useAuth()
  const isAdminOrHR = isAdmin || isHR
  const [activeTab, setActiveTab] = useState('private-info')
  // For employees, open in form view (editing mode) by default
  // For admin/HR, open in view mode
  const [isEditing, setIsEditing] = useState(!isAdminOrHR)
  const [formData, setFormData] = useState({
    name: '',
    loginId: '',
    email: '',
    mobile: '',
    company: '',
    department: '',
    manager: '',
    location: '',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    jobLove: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    interests: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    skills: [],
    certifications: [],
  })
  const [newSkill, setNewSkill] = useState('')
  const [newCertification, setNewCertification] = useState('')

  // Initialize form data from user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || '',
        loginId: user?.loginId || '',
        email: user?.email || '',
        mobile: user?.phone || '',
        company: user?.companyName || '',
        department: user?.department || '',
        manager: user?.manager || '',
        location: user?.location || '',
        about: user?.about || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        jobLove: user?.jobLove || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        interests: user?.interests || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        skills: user?.skills || [],
        certifications: user?.certifications || [],
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      phone: formData.mobile,
      companyName: formData.company,
    }
    updateUser(updatedUser)
    setIsEditing(false)
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }))
      setNewCertification('')
    }
  }

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }))
  }

  return (
    <DashboardLayout>
      {isAdminOrHR && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">For Admin:</p>
        </div>
      )}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
      </div>

      {/* Main Profile Section */}
      <Card className="mb-6">
        <CardBody>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Personal Details */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-odoo-primary to-odoo-primary-light flex items-center justify-center text-white font-semibold text-2xl">
                    {getInitials(formData.name)}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">My Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Login ID</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="loginId"
                      value={formData.loginId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.loginId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.mobile}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Company Details */}
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.department || 'N/A'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="manager"
                      value={formData.manager}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.manager || 'N/A'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.location || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('resume')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'resume'
                    ? 'border-odoo-primary text-odoo-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Resume
              </button>
              <button
                onClick={() => setActiveTab('private-info')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'private-info'
                    ? 'border-odoo-primary text-odoo-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Private Info
              </button>
              <button
                onClick={() => setActiveTab('salary-info')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'salary-info'
                    ? 'border-odoo-primary text-odoo-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <DollarSign className="h-4 w-4 inline mr-2" />
                Salary Info
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'resume' && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Resume content will be displayed here</p>
              </div>
            )}

            {activeTab === 'private-info' && (
              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Private information will be displayed here</p>
              </div>
            )}

            {activeTab === 'salary-info' && (
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Salary information will be displayed here</p>
              </div>
            )}
          </div>

          {/* Edit/Save Button */}
          <div className="mt-6 flex justify-end">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setFormData({
                      name: user?.name || '',
                      loginId: user?.loginId || '',
                      email: user?.email || '',
                      mobile: user?.phone || '',
                      company: user?.companyName || '',
                      department: user?.department || '',
                      manager: user?.manager || '',
                      location: user?.location || '',
                      about: user?.about || '',
                      jobLove: user?.jobLove || '',
                      interests: user?.interests || '',
                      skills: user?.skills || [],
                      certifications: user?.certifications || [],
                    })
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-odoo-primary text-white rounded-lg hover:bg-odoo-primary-dark"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-odoo-primary text-white rounded-lg hover:bg-odoo-primary-dark flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Lower Section - About, Skills, Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* About */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">About</h3>
                {isEditing && (
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {isEditing ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600 whitespace-pre-line">{formData.about}</p>
              )}
            </CardBody>
          </Card>

          {/* What I love about my job */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">What I love about my job</h3>
                {isEditing && (
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {isEditing ? (
                <textarea
                  name="jobLove"
                  value={formData.jobLove}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600 whitespace-pre-line">{formData.jobLove}</p>
              )}
            </CardBody>
          </Card>

          {/* My interests and hobbies */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">My interests and hobbies</h3>
                {isEditing && (
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {isEditing ? (
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600 whitespace-pre-line">{formData.interests}</p>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {formData.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-odoo-primary/10 text-odoo-primary rounded-full text-sm"
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveSkill(index)}
                            className="hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No skills added yet</p>
                )}
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      placeholder="Add skill"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-odoo-primary text-white rounded-lg hover:bg-odoo-primary-dark flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </button>
                  </div>
                )}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-odoo-primary hover:underline text-sm flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Skills
                  </button>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Certification */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Certification</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {formData.certifications.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-odoo-primary/10 text-odoo-primary rounded-full text-sm"
                      >
                        {cert}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveCertification(index)}
                            className="hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No certifications added yet</p>
                )}
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCertification()}
                      placeholder="Add certification"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                    />
                    <button
                      onClick={handleAddCertification}
                      className="px-4 py-2 bg-odoo-primary text-white rounded-lg hover:bg-odoo-primary-dark flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </button>
                  </div>
                )}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-odoo-primary hover:underline text-sm flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Certification
                  </button>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MyProfile

