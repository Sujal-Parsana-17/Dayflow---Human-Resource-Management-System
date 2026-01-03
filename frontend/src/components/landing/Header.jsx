import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  Search,
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
  User,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  BarChart3,
} from "lucide-react";
import logo from '../../assets/logo.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const categoryRef = useRef(null);
  const searchRef = useRef(null);

  const categories = [
    { name: 'Employee Management', icon: Users, href: '#features' },
    { name: 'Attendance Tracking', icon: Clock, href: '#features' },
    { name: 'Leave Management', icon: Calendar, href: '#features' },
    { name: 'Payroll & Salary', icon: DollarSign, href: '#features' },
    { name: 'Reports & Analytics', icon: BarChart3, href: '#features' },
    { name: 'Document Management', icon: FileText, href: '#features' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-lg backdrop-blur" 
          : "bg-gradient-to-br from-[#875B78] to-[#8F6B85]"
      }`}
      style={{
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2.5 group animate-bounce-once"
            style={{ animationDelay: "0.2s" }}
          >
            <div className={`rounded-xl p-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
              isScrolled 
                ? "bg-gradient-to-br from-odoo-primary to-odoo-primary-light group-hover:shadow-odoo-primary/30" 
                : "bg-white/20 backdrop-blur-sm group-hover:shadow-white/30"
            }`}>
              <img 
                src={logo} 
                alt="Dayflow Logo" 
                className={`h-8 w-auto object-contain transition-all duration-300 ${
                  !isScrolled ? "brightness-0 invert" : ""
                }`}
              />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled 
                ? "text-[#5C3A52] group-hover:text-odoo-primary" 
                : "text-white group-hover:text-white/90"
            }`}>
              Dayflow
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a
              href="#features"
              className={`relative text-[15px] font-medium py-2 transition-all duration-300 tracking-wide group ${
                isActive("#features")
                  ? isScrolled 
                    ? "text-odoo-primary font-semibold" 
                    : "text-white font-semibold"
                  : isScrolled
                    ? "text-gray-600 hover:text-[#8F6B85] hover:-translate-y-0.5"
                    : "text-white/90 hover:text-white hover:-translate-y-0.5"
              }`}
            >
              Features
              {isActive("#features") && (
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-t animate-slide-in ${
                  isScrolled ? "bg-odoo-primary" : "bg-white"
                }`}></span>
              )}
              {!isActive("#features") && (
                <span className={`absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  isScrolled ? "bg-[#8F6B85]" : "bg-white"
                }`}></span>
              )}
            </a>

            <div ref={categoryRef} className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`relative flex items-center bg-transparent text-[15px] font-medium py-2 transition-all duration-300 tracking-wide group ${
                  isCategoryOpen
                    ? isScrolled 
                      ? "text-odoo-primary font-semibold" 
                      : "text-white font-semibold"
                    : isScrolled
                      ? "text-gray-600 hover:text-[#8F6B85] hover:-translate-y-0.5 hover:bg-purple-50 px-3 rounded-lg"
                      : "text-white/90 hover:text-white hover:-translate-y-0.5 hover:bg-white/10 px-3 rounded-lg"
                }`}
              >
                Category
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                  isCategoryOpen ? 'rotate-180' : ''
                }`} />
                {isCategoryOpen && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-t animate-slide-in ${
                    isScrolled ? "bg-odoo-primary" : "bg-white"
                  }`}></span>
                )}
              </button>
              
              {/* Category Dropdown */}
              {isCategoryOpen && (
                <div className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-2xl overflow-hidden z-50 animate-slide-down ${
                  isScrolled ? 'bg-white border border-gray-100' : 'bg-white'
                }`}>
                  <div className="p-2">
                    {categories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <a
                          key={index}
                          href={category.href}
                          onClick={() => setIsCategoryOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-odoo-primary transition-all duration-200 group"
                        >
                          <div className="p-2 rounded-lg bg-purple-50 text-odoo-primary group-hover:bg-odoo-primary group-hover:text-white transition-all duration-200">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-sm">{category.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#experience"
              className={`relative text-[15px] font-medium py-2 transition-all duration-300 tracking-wide group ${
                isActive("#experience")
                  ? isScrolled 
                    ? "text-odoo-primary font-semibold" 
                    : "text-white font-semibold"
                  : isScrolled
                    ? "text-gray-600 hover:text-[#8F6B85] hover:-translate-y-0.5"
                    : "text-white/90 hover:text-white hover:-translate-y-0.5"
              }`}
            >
              Experience Center
              {isActive("#experience") && (
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-t animate-slide-in ${
                  isScrolled ? "bg-odoo-primary" : "bg-white"
                }`}></span>
              )}
              {!isActive("#experience") && (
                <span className={`absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  isScrolled ? "bg-[#8F6B85]" : "bg-white"
                }`}></span>
              )}
            </a>

            <a
              href="#about"
              className={`relative text-[15px] font-medium py-2 transition-all duration-300 tracking-wide group ${
                isActive("#about")
                  ? isScrolled 
                    ? "text-odoo-primary font-semibold" 
                    : "text-white font-semibold"
                  : isScrolled
                    ? "text-gray-600 hover:text-[#8F6B85] hover:-translate-y-0.5"
                    : "text-white/90 hover:text-white hover:-translate-y-0.5"
              }`}
            >
              About
              {isActive("#about") && (
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-t animate-slide-in ${
                  isScrolled ? "bg-odoo-primary" : "bg-white"
                }`}></span>
              )}
              {!isActive("#about") && (
                <span className={`absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  isScrolled ? "bg-[#8F6B85]" : "bg-white"
                }`}></span>
              )}
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`bg-transparent transition-all duration-300 hover:scale-110 p-2 rounded-lg ${
                  isScrolled 
                    ? "text-gray-600 hover:text-odoo-primary hover:bg-purple-50" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slide-down">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search features, documentation..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
                        autoFocus
                      />
                    </div>
                    {searchQuery && (
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-gray-500 px-2 py-1">Quick Links</p>
                        <a href="#features" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg">Features</a>
                        <a href="#how-it-works" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg">How It Works</a>
                        <a href="#experience" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg">Experience Center</a>
                        <a href="#about" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg">About Us</a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/signup"
              className={`px-6 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl active:scale-98 active:translate-y-0 shadow-md ${
                isScrolled 
                  ? "bg-gradient-to-br from-odoo-primary to-odoo-primary-light text-white hover:shadow-odoo-primary/40 shadow-odoo-primary/20" 
                  : "bg-white text-[#875B78] hover:shadow-white/30 shadow-white/20"
              }`}
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className={`font-medium text-[15px] transition-all duration-300 hover:underline hover:underline-offset-4 hover:decoration-2 active:scale-98 ${
                isScrolled 
                  ? "text-odoo-primary hover:text-[#5C3A52]" 
                  : "text-white hover:text-white/80"
              }`}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? "text-gray-600 hover:bg-purple-50 hover:text-odoo-primary" 
                : "text-white hover:bg-white/10 hover:text-white"
            }`}
          >
            <div
              className="transition-transform duration-300"
              style={{
                transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`lg:hidden border-t animate-slide-down shadow-xl ${
              isScrolled 
                ? "bg-white border-gray-100" 
                : "bg-gradient-to-br from-[#875B78] to-[#8F6B85] border-white/10"
            }`}
            style={{
              animation: "slideDown 0.3s ease-in-out",
            }}
          >
            <nav className="flex flex-col py-2">
              <a
                href="#features"
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-4 text-[15px] font-medium transition-all duration-200 border-l-3 border-transparent ${
                  isScrolled 
                    ? "text-gray-600 hover:text-odoo-primary hover:bg-purple-50 hover:border-odoo-primary" 
                    : "text-white/90 hover:text-white hover:bg-white/10 hover:border-white"
                }`}
              >
                Features
              </a>
              
              {/* Mobile Category Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                  className={`w-full px-6 py-4 text-[15px] font-medium transition-all duration-200 flex items-center justify-between ${
                    isScrolled 
                      ? "text-gray-600 hover:text-odoo-primary hover:bg-purple-50" 
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>Category</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                    isMobileCategoryOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {isMobileCategoryOpen && (
                  <div className={`px-4 py-2 space-y-1 ${
                    isScrolled ? 'bg-purple-50/50' : 'bg-white/5'
                  }`}>
                    {categories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <a
                          key={index}
                          href={category.href}
                          onClick={() => {
                            setIsMobileCategoryOpen(false);
                            setIsMenuOpen(false);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                            isScrolled
                              ? 'text-gray-700 hover:bg-purple-100'
                              : 'text-white/80 hover:bg-white/10'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{category.name}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <a
                href="#experience"
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-4 text-[15px] font-medium transition-all duration-200 border-l-3 border-transparent ${
                  isScrolled 
                    ? "text-gray-600 hover:text-odoo-primary hover:bg-purple-50 hover:border-odoo-primary" 
                    : "text-white/90 hover:text-white hover:bg-white/10 hover:border-white"
                }`}
              >
                Experience Center
              </a>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-4 text-[15px] font-medium transition-all duration-200 border-l-3 border-transparent ${
                  isScrolled 
                    ? "text-gray-600 hover:text-odoo-primary hover:bg-purple-50 hover:border-odoo-primary" 
                    : "text-white/90 hover:text-white hover:bg-white/10 hover:border-white"
                }`}
              >
                About
              </a>

              <div className={`px-6 py-4 space-y-3 border-t mt-2 ${
                isScrolled ? "border-gray-100" : "border-white/10"
              }`}>
                <Link
                  to="/signup"
                  className={`block w-full px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 active:scale-98 ${
                    isScrolled 
                      ? "bg-gradient-to-br from-odoo-primary to-odoo-primary-light text-white hover:shadow-lg hover:shadow-odoo-primary/40" 
                      : "bg-white text-[#875B78] hover:shadow-lg hover:shadow-white/30"
                  }`}
                >
                  Get Started
                </Link>
                <Link
                  to="/signin"
                  className={`block w-full px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 active:scale-98 ${
                    isScrolled 
                      ? "text-odoo-primary border border-odoo-primary hover:bg-purple-50" 
                      : "text-white border border-white hover:bg-white/10"
                  }`}
                >
                  Sign In
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 400px;
            opacity: 1;
          }
        }
        
        @keyframes slide-in {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
          transform-origin: left;
        }
        
        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-bounce-once {
          animation: bounce-once 0.6s ease-in-out;
        }
        
        .active\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </header>
  );
}

export default Header;
