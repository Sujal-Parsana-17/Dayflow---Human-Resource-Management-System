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
      const errorMessage = err.response?.data?.message || 'Sign up failed'
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
      setUser(response.user)
      
      return response
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Sign in failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
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
