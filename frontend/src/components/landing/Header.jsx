import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  Search,
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
  User,
} from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
      style={{
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "#ffffff",
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
            <div className="w-8 h-8 bg-gradient-to-br from-odoo-primary to-odoo-primary-light rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-odoo-primary/30">
              <span className="text-white font-bold text-base">D</span>
            </div>
            <span className="text-xl font-bold text-[#5C3A52] tracking-tight transition-colors duration-300 group-hover:text-odoo-primary">
              Dayflow
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a
              href="#features"
              className={`relative text-[15px] font-medium py-2 transition-all duration-300 tracking-wide group ${
                isActive("#features")
                  ? "text-odoo-primary font-semibold"
                  : "text-gray-600 hover:text-[#8F6B85] hover:-translate-y-0.5"
              }`}
            >
              Features
              {isActive("#features") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-odoo-primary rounded-t animate-slide-in"></span>
              )}
              {!isActive("#features") && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#8F6B85] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              )}
            </a>

            <button
              className={`relative flex items-center text-[15px] font-medium py-2 transition-all duration-300 tracking-wide group ${
                isActive("#category")
                  ? "text-odoo-primary font-semibold"
                  : "text-gray-600 hover:text-[#8F6B85] hover:-translate-y-0.5"
              }`}
            >
              Category
              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180 duration-300" />
              {isActive("#category") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-odoo-primary rounded-t animate-slide-in"></span>
              )}
              {!isActive("#category") && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#8F6B85] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              )}
            </button>

            <a
              href="#pricing"
              className={`relative text-[15px] font-medium py-2 transition-all duration-300 tracking-wide group ${
                isActive("#pricing")
                  ? "text-odoo-primary font-semibold"
                  : "text-gray-600 hover:text-[#8F6B85] hover:-translate-y-0.5"
              }`}
            >
              Experience Center
              {isActive("#pricing") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-odoo-primary rounded-t animate-slide-in"></span>
              )}
              {!isActive("#pricing") && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#8F6B85] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              )}
            </a>

            <a
              href="#about"
              className={`relative text-[15px] font-medium py-2 transition-all duration-300 tracking-wide group ${
                isActive("#about")
                  ? "text-odoo-primary font-semibold"
                  : "text-gray-600 hover:text-[#8F6B85] hover:-translate-y-0.5"
              }`}
            >
              About
              {isActive("#about") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-odoo-primary rounded-t animate-slide-in"></span>
              )}
              {!isActive("#about") && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#8F6B85] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              )}
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-odoo-primary transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-purple-50">
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-gradient-to-br from-odoo-primary to-odoo-primary-light text-white rounded-lg font-semibold text-[15px] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-odoo-primary/40 active:scale-98 active:translate-y-0 shadow-md shadow-odoo-primary/20"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="text-odoo-primary font-medium text-[15px] transition-all duration-300 hover:text-[#5C3A52] hover:underline hover:underline-offset-4 hover:decoration-2 active:scale-98"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-purple-50 hover:text-odoo-primary rounded-lg transition-all duration-300"
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
            className="lg:hidden border-t border-gray-100 animate-slide-down shadow-xl"
            style={{
              animation: "slideDown 0.3s ease-in-out",
            }}
          >
            <nav className="flex flex-col py-2">
              <a
                href="#features"
                className="px-6 py-4 text-[15px] font-medium text-gray-600 hover:text-odoo-primary hover:bg-purple-50 transition-all duration-200 border-l-3 border-transparent hover:border-odoo-primary"
              >
                Features
              </a>
              <button className="px-6 py-4 text-[15px] font-medium text-gray-600 hover:text-odoo-primary hover:bg-purple-50 transition-all duration-200 flex items-center justify-between">
                <span>Category</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <a
                href="#pricing"
                className="px-6 py-4 text-[15px] font-medium text-gray-600 hover:text-odoo-primary hover:bg-purple-50 transition-all duration-200 border-l-3 border-transparent hover:border-odoo-primary"
              >
                Experience Center
              </a>
              <a
                href="#about"
                className="px-6 py-4 text-[15px] font-medium text-gray-600 hover:text-odoo-primary hover:bg-purple-50 transition-all duration-200 border-l-3 border-transparent hover:border-odoo-primary"
              >
                About
              </a>

              <div className="px-6 py-4 space-y-3 border-t border-gray-100 mt-2">
                <Link
                  to="/signup"
                  className="block w-full px-6 py-3 bg-gradient-to-br from-odoo-primary to-odoo-primary-light text-white rounded-lg font-semibold text-center transition-all duration-300 hover:shadow-lg hover:shadow-odoo-primary/40 active:scale-98"
                >
                  Get Started
                </Link>
                <Link
                  to="/signin"
                  className="block w-full px-6 py-3 text-odoo-primary border border-odoo-primary rounded-lg font-semibold text-center transition-all duration-300 hover:bg-purple-50 active:scale-98"
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
