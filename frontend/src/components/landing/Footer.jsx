import React from 'react'
import { Building2, Mail, Linkedin, Twitter, Facebook, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#5C3A52] to-[#714B67] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-odoo-primary" />
              </div>
              <span className="text-2xl font-bold">Dayflow</span>
            </div>
            <p className="text-purple-100 mb-4 leading-relaxed">
              Every workday, perfectly aligned.
            </p>
            <p className="text-purple-200 text-sm">
              © 2025 Dayflow. All rights reserved.
            </p>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-purple-100 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-purple-100 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#about" className="text-purple-100 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-purple-100 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link to="/signin" className="text-purple-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-purple-100 mb-4">
              Follow us on social media for updates and news
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-purple-100 text-sm flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-400 fill-current" /> for better workforce management
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
