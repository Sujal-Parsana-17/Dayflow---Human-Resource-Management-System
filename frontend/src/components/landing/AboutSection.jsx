import React from 'react';
import { Target, Eye, Heart, Zap, Shield, Globe, Users, Award, TrendingUp } from 'lucide-react';

function AboutSection() {
  const values = [
    {
      icon: Heart,
      title: 'People First',
      description: 'We believe in putting people at the center of everything we do, creating solutions that truly make a difference.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving with cutting-edge technology to provide the best HR management experience.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data security is our top priority. We maintain the highest standards of data protection.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving companies worldwide with localized solutions that respect regional requirements.',
    },
  ];

  const team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      bio: '15+ years in HR tech',
    },
    {
      name: 'Sarah Martinez',
      role: 'CTO',
      bio: 'Former Google Engineer',
    },
    {
      name: 'James Wilson',
      role: 'Head of Product',
      bio: '10+ years in SaaS',
    },
    {
      name: 'Emily Chen',
      role: 'Head of Customer Success',
      bio: 'Customer satisfaction expert',
    },
  ];

  const milestones = [
    { year: '2018', event: 'Dayflow Founded', icon: Zap },
    { year: '2019', event: '1,000 Companies Onboarded', icon: Users },
    { year: '2021', event: 'Series A Funding', icon: TrendingUp },
    { year: '2023', event: 'Industry Excellence Award', icon: Award },
    { year: '2025', event: '10,000+ Active Users', icon: Globe },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Dayflow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering businesses with intelligent HR management solutions since 2018
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Mission */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 lg:p-12 hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-odoo-primary to-odoo-primary-light text-white mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To revolutionize human resource management by providing intuitive, powerful, and affordable solutions 
              that help businesses focus on what matters most - their people. We're committed to making HR processes 
              seamless, efficient, and enjoyable for everyone.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-6">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become the world's most trusted and innovative HRMS platform, empowering organizations of all sizes 
              to build better workplaces. We envision a future where HR management is intelligent, automated, 
              and deeply connected to organizational success.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-purple-100 text-odoo-primary mb-4 group-hover:bg-gradient-to-br group-hover:from-odoo-primary group-hover:to-odoo-primary-light group-hover:text-white transition-all duration-300 group-hover:shadow-lg">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-odoo-primary to-odoo-primary-light hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 inline-block">
                        <h4 className="text-2xl font-bold text-odoo-primary mb-2">{milestone.year}</h4>
                        <p className="text-gray-700 font-medium">{milestone.event}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-odoo-primary to-odoo-primary-light flex items-center justify-center text-white shadow-xl">
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <div className="flex-1"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Meet Our Team
          </h3>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Passionate professionals dedicated to building the best HR management platform
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100">
                  <div className="w-full h-64 flex items-center justify-center group-hover:from-odoo-primary group-hover:to-odoo-primary-light transition-all duration-500">
                    <Users className="w-24 h-24 text-odoo-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-odoo-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Growing Family
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Be part of the future of HR management. Start your journey with Dayflow today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="bg-white text-purple-700 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block"
              >
                Get Started Free
              </a>
              <a
                href="#experience"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300 inline-block"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
