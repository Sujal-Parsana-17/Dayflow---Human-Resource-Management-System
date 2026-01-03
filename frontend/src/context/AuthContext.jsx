import React, { createContext, useState, useEffect } from 'react'
import { authService } from '@services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('authToken')
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        console.error('Failed to load user:', err)
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const signUp = async (userData) => {
    try {
      setError(null)
      setLoading(true)
      const response = await authService.signUp(userData)
      
      // Store user and token
      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('authToken', response.token)
      setUser(response.user)
      
      return response
    } catch (err) {
      // Extract error message from various possible formats
      let errorMessage = 'Sign up failed. Please try again.'
      
      if (err.response?.data) {
        // If there's a message field, use it
        if (err.response.data.message) {
          errorMessage = err.response.data.message
        }
        // If there are validation errors, format them
        else if (err.response.data.errors && Array.isArray(err.response.data.errors)) {
          errorMessage = err.response.data.errors
            .map(e => e.message || e.msg)
            .join(', ')
        }
        // If there's an error field
        else if (err.response.data.error) {
          errorMessage = err.response.data.error
        }
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (credentials) => {
    try {
      setError(null)
      setLoading(true)
      const response = await authService.signIn(credentials)
      
      // Store user and token
      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('authToken', response.token)
      
      // Store password change requirement flag
      if (response.passwordChangeRequired) {
        localStorage.setItem('passwordChangeRequired', 'true')
      }
      
      setUser(response.user)
      
      return response
    } catch (err) {
      // Extract error message from various possible formats
      let errorMessage = 'Sign in failed. Please check your credentials.'
      
      if (err.response?.data) {
        if (err.response.data.message) {
          errorMessage = err.response.data.message
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error
        }
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    localStorage.removeItem('passwordChangeRequired')
    setUser(null)
    setError(null)
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isHR: user?.role === 'hr',
    isEmployee: user?.role === 'employee',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
