import api from './api'
import { API_ENDPOINTS } from '@utils/constants'
import { generateLoginId } from '@utils/helpers'

export const authService = {
  // Sign Up
  signUp: async (userData) => {
    try {
      // Simulate API call (replace with real API later)
      // In production, this would be: await api.post(API_ENDPOINTS.AUTH.SIGNUP, userData)
      
      // For now, simulate with localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if email already exists
      if (users.some(u => u.email === userData.email)) {
        throw new Error('Email already registered')
      }
      
      // Generate login ID
      const loginId = generateLoginId(userData.companyName, users.length + 1)
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        loginId,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        companyName: userData.companyName,
        companyLogo: userData.companyLogo || null,
        role: users.length === 0 ? 'admin' : userData.role || 'employee',
        createdAt: new Date().toISOString(),
      }
      
      // Save user
      users.push({ ...newUser, password: userData.password })
      localStorage.setItem('users', JSON.stringify(users))
      
      // Mark as new user for dashboard welcome
      localStorage.setItem('isNewUser', 'true')
      
      // Generate token (fake JWT)
      const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }))
      
      // Return user without password
      const { password, ...userWithoutPassword } = newUser
      
      return {
        user: userWithoutPassword,
        token,
        message: 'Account created successfully',
      }
    } catch (error) {
      throw error
    }
  },

  // Sign In
  signIn: async (credentials) => {
    try {
      // Check for test accounts first
      if (credentials.identifier === 'test@gmail.com' && credentials.password === '123456789') {
        const testUser = {
          id: 'test-admin-001',
          loginId: 'TEST2026001',
          email: 'test@gmail.com',
          name: 'Test Admin',
          phone: '+1234567890',
          companyName: 'Test Company',
          companyLogo: null,
          role: 'admin',
          createdAt: new Date().toISOString(),
        }
        
        // Generate token
        const token = btoa(JSON.stringify({ userId: testUser.id, email: testUser.email }))
        
        return {
          user: testUser,
          token,
          message: 'Signed in successfully',
        }
      }
      
      // Employee test account
      if (credentials.identifier === 'employee@gmail.com' && credentials.password === '123456789') {
        const testEmployee = {
          id: 'test-employee-001',
          loginId: 'TEST2026002',
          email: 'employee@gmail.com',
          name: 'Test Employee',
          phone: '+1234567891',
          companyName: 'Test Company',
          companyLogo: null,
          role: 'employee',
          createdAt: new Date().toISOString(),
        }
        
        // Generate token
        const token = btoa(JSON.stringify({ userId: testEmployee.id, email: testEmployee.email }))
        
        return {
          user: testEmployee,
          token,
          message: 'Signed in successfully',
        }
      }
      
      // Simulate API call (replace with real API later)
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Find user by email or loginId
      const user = users.find(
        u => u.email === credentials.identifier || u.loginId === credentials.identifier
      )
      
      if (!user) {
        throw new Error('Invalid credentials')
      }
      
      // Check password
      if (user.password !== credentials.password) {
        throw new Error('Invalid credentials')
      }
      
      // Generate token
      const token = btoa(JSON.stringify({ userId: user.id, email: user.email }))
      
      // Return user without password
      const { password, ...userWithoutPassword } = user
      
      return {
        user: userWithoutPassword,
        token,
        message: 'Signed in successfully',
      }
    } catch (error) {
      throw error
    }
  },

  // Sign Out
  signOut: async () => {
    // In production, you might want to invalidate the token on the server
    return { message: 'Signed out successfully' }
  },

  // Refresh Token
  refreshToken: async () => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REFRESH)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
