import React from 'react'
import { Users, Calendar, Plane, DollarSign, Shield, Activity } from 'lucide-react'

function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Complete employee profiles and documentation',
      description: 'Maintain employee data, profile pictures, job details, documents and more in one secure place.',
    },
    {
      icon: Calendar,
      title: 'Track attendance with calendar views',
      description: 'Daily and weekly attendance views with check-in/check-out system. Track present, absent, half-day and leave status.',
    },
    {
      icon: Plane,
      title: 'Streamlined leave and approvals',
      description: 'Employees can apply for leave easily. Admins can review, approve, and manage leave requests with comments.',
    },
    {
      icon: DollarSign,
      title: 'Transparent salary management',
      description: 'View and manage salary structures with detailed breakdowns. Role-based access ensures data security.',
    },
    {
      icon: Shield,
      title: 'Secure admin and employee portals',
      description: 'Separate access levels for employees and HR officers. Admin can manage all data while employees see only their information.',
    },
    {
      icon: Activity,
      title: 'Track attendance and leave patterns',
      description: 'Get automatic insights into attendance records, leave balance, and team availability in real-time.',
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-odoo-primary uppercase tracking-wide mb-2">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything You Need to<br />
            Manage Your Team
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-8 bg-white border border-gray-200 rounded-xl hover:border-odoo-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
                    <Icon className="w-7 h-7 text-odoo-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
