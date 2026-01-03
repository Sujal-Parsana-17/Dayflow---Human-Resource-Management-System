import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Building2, Mail, Lock, User, Phone, Upload, AlertCircle } from 'lucide-react'
import { useAuth } from '@hooks/useAuth'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'

// Validation Schema
const signUpSchema = yup.object().shape({
  companyName: yup.string().required('Company name is required').min(2, 'Company name must be at least 2 characters'),
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup.string().required('Phone number is required').matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().required('Please confirm your password').oneOf([yup.ref('password')], 'Passwords must match'),
})

function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [companyLogo, setCompanyLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setServerError('Logo size must be less than 2MB')
        return
      }
      setCompanyLogo(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setServerError('')
      
      const userData = {
        ...data,
        companyLogo: logoPreview,
      }
      
      await signUp(userData)
      
      // Navigate based on role (first user is admin)
      navigate('/dashboard')
    } catch (error) {
      setServerError(error.message || 'Sign up failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="text-gray-600 mt-2">Start managing your HR operations with Dayflow</p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-danger mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-danger">{serverError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Company Name */}
          <Input
            label="Company Name *"
            placeholder="Enter your company name"
            icon={<Building2 className="w-5 h-5" />}
            error={errors.companyName?.message}
            {...register('companyName')}
          />

          {/* Company Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Company Logo (Optional)
            </label>
            <div className="flex items-center space-x-4">
              {logoPreview && (
                <div className="w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50">
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-odoo-primary transition-colors">
                  <Upload className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    {companyLogo ? companyLogo.name : 'Upload Logo (Max 2MB)'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Grid Layout for Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name *"
              placeholder="Enter your full name"
              icon={<User className="w-5 h-5" />}
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email Address *"
              type="email"
              placeholder="your.email@company.com"
              icon={<Mail className="w-5 h-5" />}
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          {/* Phone Number */}
          <Input
            label="Phone Number *"
            placeholder="1234567890"
            icon={<Phone className="w-5 h-5" />}
            error={errors.phone?.message}
            {...register('phone')}
          />

          {/* Grid Layout for Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Password *"
              type="password"
              placeholder="Enter password (min 6 characters)"
              icon={<Lock className="w-5 h-5" />}
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              label="Confirm Password *"
              type="password"
              placeholder="Confirm your password"
              icon={<Lock className="w-5 h-5" />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> As the first user, you will be assigned the Admin role.
              Your Login ID will be auto-generated after registration.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-odoo-primary hover:text-odoo-primary-dark font-medium">
              Sign In
            </Link>
          </p>
          <Link
            to="/"
            className="inline-block mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
