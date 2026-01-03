import React from 'react'
import { Link } from 'react-router-dom'
import { Building2, Users, Calendar, FileText, CheckSquare, BarChart3 } from 'lucide-react'

function LandingPage() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Employee Management',
      description: 'Comprehensive employee profiles, onboarding, and document management',
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: 'Attendance Tracking',
      description: 'Real-time attendance monitoring with check-in/check-out features',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Leave Management',
      description: 'Streamlined leave application and approval workflow',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Payroll Visibility',
      description: 'Transparent salary structure and payroll information',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Reports & Analytics',
      description: 'Insightful reports and data visualization for HR decisions',
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Role-Based Access',
      description: 'Secure access control for Admin, HR, and Employees',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-odoo-primary" />
              <h1 className="text-2xl font-bold text-odoo-primary">Dayflow</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/signin"
                className="px-4 py-2 text-odoo-primary hover:text-odoo-primary-dark font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-odoo-primary to-odoo-primary-light text-white rounded-lg hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Streamline Your HR Operations with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-odoo-primary to-odoo-primary-light">
              Dayflow
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive Human Resource Management System designed to digitize and
            simplify employee onboarding, attendance tracking, leave management, and more.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-gradient-to-r from-odoo-primary to-odoo-primary-light text-white rounded-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Start Free Trial
            </Link>
            <Link
              to="/signin"
              className="px-8 py-3 bg-white text-odoo-primary border-2 border-odoo-primary rounded-lg font-semibold hover:bg-odoo-primary hover:text-white transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for HR Management
          </h3>
          <p className="text-gray-600">
            Powerful features designed to make HR operations effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-lg flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-odoo-primary to-odoo-primary-light py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your HR Operations?
          </h3>
          <p className="text-white/90 mb-8 text-lg">
            Join hundreds of companies streamlining their HR processes with Dayflow
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-white text-odoo-primary rounded-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2026 Dayflow HRMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
