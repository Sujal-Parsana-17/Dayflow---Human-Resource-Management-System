import React from 'react'
import Header from '@components/landing/Header'
import HeroSection from '@components/landing/HeroSection'
import FeaturesSection from '@components/landing/FeaturesSection'
import HowItWorksSection from '@components/landing/HowItWorksSection'
import DashboardPreview from '@components/landing/DashboardPreview'
import Footer from '@components/landing/Footer'

function LandingPage() {
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardPreview />
      <Footer />
    </div>
  )
}

export default LandingPage
