import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Building2, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@hooks/useAuth'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'

// Validation Schema
const signInSchema = yup.object().shape({
  identifier: yup.string().required('Email or Login ID is required'),
  password: yup.string().required('Password is required'),
})

function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  })

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setServerError('')
      
      const response = await signIn(data)
      
      // Check if password change is required
      if (response.passwordChangeRequired) {
        navigate('/change-password')
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      setServerError(error.message || 'Sign in failed. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your Dayflow account</p>
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
          {/* Email or Login ID */}
          <Input
            label="Email or Login ID *"
            placeholder="Enter your email or login ID"
            icon={<Mail className="w-5 h-5" />}
            error={errors.identifier?.message}
            {...register('identifier')}
          />

          {/* Password with Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password *
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className={`w-full px-4 py-2.5 pl-10 pr-10 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-odoo-primary focus:border-transparent ${
                  errors.password ? 'border-danger' : 'border-gray-300'
                }`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-sm text-danger">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-odoo-primary hover:text-odoo-primary-dark font-medium"
            >
              Forgot Password?
            </Link>
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
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">New to Dayflow?</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-odoo-primary hover:text-odoo-primary-dark font-medium">
              Create Account
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

export default SignIn
