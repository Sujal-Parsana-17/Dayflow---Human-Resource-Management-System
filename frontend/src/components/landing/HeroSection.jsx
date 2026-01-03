import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#875B78] via-[#9B6F8E] to-[#8F6B85] overflow-hidden min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Modern HR for the<br />
              New Era of Work.
            </h1>
            <p className="text-xl md:text-2xl font-light mb-4 text-purple-100">
              Simplify Your Workforce Management
            </p>
            <p className="text-base md:text-lg mb-8 text-purple-50 leading-relaxed max-w-xl">
              Streamline your entire employee lifecycle with an intuitive platform. 
              Manage employees, attendance, and leaves—all in one place.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-odoo-primary rounded-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1 group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm rounded-lg font-semibold hover:bg-white hover:text-odoo-primary hover:border-white transition-all">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <div className="relative z-10">
            <div className="relative transform perspective-1000 hover:scale-105 transition-transform duration-500">
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-odoo-primary to-odoo-primary-light p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold">D</span>
                    </div>
                    <div>
                      <div className="font-semibold">Dashboard</div>
                      <div className="text-xs text-purple-100">Overview</div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-success">76%</div>
                      <div className="text-xs text-gray-600">Attendance</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-info">12</div>
                      <div className="text-xs text-gray-600">On Leave</div>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="bg-gray-50 rounded-lg p-4 h-32 flex items-end justify-around">
                    <div className="w-8 bg-odoo-primary rounded-t" style={{ height: '60%' }}></div>
                    <div className="w-8 bg-odoo-primary-light rounded-t" style={{ height: '80%' }}></div>
                    <div className="w-8 bg-odoo-primary rounded-t" style={{ height: '45%' }}></div>
                    <div className="w-8 bg-odoo-primary-light rounded-t" style={{ height: '90%' }}></div>
                    <div className="w-8 bg-odoo-primary rounded-t" style={{ height: '70%' }}></div>
                  </div>

                  {/* Employee List */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-300 rounded w-24 mb-1"></div>
                          <div className="h-2 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="w-16 h-6 bg-green-100 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Mobile Card */}
              <div className="absolute -right-4 -bottom-4 w-32 bg-white rounded-xl shadow-xl p-3 border-4 border-purple-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                  <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom Shape */}
      <div className="absolute bottom-0 left-0 right-0 -mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none" style={{ height: '100px' }}>
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
