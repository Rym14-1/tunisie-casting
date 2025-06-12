// src/api/auth.js
import apiClient from './axiosConfig'

export const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/register', userData)
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials)
  return response.data
}

export const getUserProfile = async () => {
  const response = await apiClient.get('/auth/profile')
  return response.data
}
