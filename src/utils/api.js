// src/utils/api.js
const API_URL = 'http://localhost:3001/api'

// Simulated API calls - in a real app, these would be actual HTTP requests
export const api = {
  async get(endpoint) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const key = endpoint.split('/')[1]
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : (Array.isArray(data) ? [] : null)
  },

  async post(endpoint, data) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const key = endpoint.split('/')[1]
    const existingData = JSON.parse(localStorage.getItem(key) || '[]')
    const newItem = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    existingData.push(newItem)
    localStorage.setItem(key, JSON.stringify(existingData))
    return newItem
  },

  async put(endpoint, data) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const key = endpoint.split('/')[1]
    const id = endpoint.split('/')[2]
    const existingData = JSON.parse(localStorage.getItem(key) || '[]')
    const updatedData = existingData.map(item => 
      item.id === id ? {...data, id, updatedAt: new Date().toISOString()} : item
    )
    
    localStorage.setItem(key, JSON.stringify(updatedData))
    return {...data, id, updatedAt: new Date().toISOString()}
  },

  async delete(endpoint) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const key = endpoint.split('/')[1]
    const id = endpoint.split('/')[2]
    const existingData = JSON.parse(localStorage.getItem(key) || '[]')
    const filteredData = existingData.filter(item => item.id !== id)
    
    localStorage.setItem(key, JSON.stringify(filteredData))
    return { success: true }
  }
}

// Initialize localStorage with sample data if empty
if (!localStorage.getItem('blogs')) {
  localStorage.setItem('blogs', JSON.stringify([
    {
      id: '1',
      title: 'Welcome to the Blog Management System',
      content: 'This is a sample blog post. You can edit or delete it to get started with your own content.',
      author: 'Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'published'
    }
  ]))
}

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([]))
}