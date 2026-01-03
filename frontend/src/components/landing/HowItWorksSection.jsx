import React from 'react'
import { Rocket, UserPlus, LayoutDashboard, ArrowRight } from 'lucide-react'

function HowItWorksSection() {
  const steps = [
    {
      icon: Rocket,
      title: 'Sign Up',
      description: 'Create your company account and get your unique login credentials. Sign up with your company name and employee details.',
    },
    {
      icon: UserPlus,
      title: 'Add Employees',
      description: 'Import or manually add employee details. System auto-generates unique login IDs for each employee (e.g., GOJO2025001).',
    },
    {
      icon: LayoutDashboard,
      title: 'Start Managing',
      description: 'Track attendance, approve leaves, manage profiles and view all workforce data from a unified dashboard. Admin and employee portals keep everything organized.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-odoo-primary uppercase tracking-wide mb-2">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Get Started in 3 Simple Steps
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connecting Arrow - Desktop Only */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 -right-4 z-0">
                    <ArrowRight className="w-8 h-8 text-odoo-primary opacity-30" />
                  </div>
                )}

                {/* Step Card */}
                <div className="relative z-10 bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-2xl">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="text-sm font-bold text-odoo-primary mb-2">
                    STEP {index + 1}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-odoo-primary to-transparent"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
