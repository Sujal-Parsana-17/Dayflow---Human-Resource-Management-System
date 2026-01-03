import React from 'react';
import { Play, CheckCircle, Star, Users, TrendingUp, Award } from 'lucide-react';

function ExperienceCenterSection() {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Users' },
    { icon: TrendingUp, value: '98%', label: 'Satisfaction Rate' },
    { icon: Award, value: '50+', label: 'Awards Won' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Manager',
      company: 'Tech Solutions Inc.',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'Dayflow has transformed how we manage our workforce. The intuitive interface and powerful features have saved us countless hours.',
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      company: 'Global Enterprises',
      image: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'The attendance tracking and leave management features are exceptional. Our team loves how easy it is to use.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO',
      company: 'Startup Innovations',
      image: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: 'Best HRMS solution we\'ve tried. The automated payroll processing alone has been worth the investment.',
    },
  ];

  const benefits = [
    'Live demo with real-time data',
    'One-on-one consultation with experts',
    'Customized setup for your business',
    'Free 30-day trial with full features',
    'Dedicated support team',
    'Migration assistance from old systems',
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience Center
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See Dayflow in action with a live demo, or schedule a personalized walkthrough with our team
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-odoo-primary to-odoo-primary-light text-white mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Video Demo Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Video Preview */}
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-8 lg:p-12 flex items-center justify-center">
              <div className="relative w-full aspect-video bg-black/20 rounded-2xl flex items-center justify-center group cursor-pointer hover:bg-black/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl"></div>
                <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-10 h-10 text-purple-600 ml-1" />
                </div>
              </div>
            </div>

            {/* Right Side - Benefits List */}
            <div className="p-8 lg:p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                What You'll Experience
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="mt-1">
                      <CheckCircle className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full bg-gradient-to-r from-odoo-primary to-odoo-primary-light text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Book Your Demo
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-odoo-primary to-odoo-primary-light rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your HR Management?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of companies already using Dayflow to streamline their HR operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-odoo-primary px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

export default ExperienceCenterSection;
