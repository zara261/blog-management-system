// src/context/BlogContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../utils/api'

const BlogContext = createContext()

export function useBlogs() {
  return useContext(BlogContext)
}

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const data = await api.get('/blogs')
      setBlogs(data)
      setError('')
    } catch (err) {
      setError('Failed to fetch blogs')
    } finally {
      setLoading(false)
    }
  }

  const createBlog = async (blogData) => {
    try {
      const newBlog = await api.post('/blogs', blogData)
      setBlogs(prev => [...prev, newBlog])
      setError('')
      return newBlog
    } catch (err) {
      setError('Failed to create blog')
      throw err
    }
  }

  const updateBlog = async (id, blogData) => {
    try {
      const updatedBlog = await api.put(`/blogs/${id}`, blogData)
      setBlogs(prev => prev.map(blog => blog.id === id ? updatedBlog : blog))
      setError('')
      return updatedBlog
    } catch (err) {
      setError('Failed to update blog')
      throw err
    }
  }

  const deleteBlog = async (id) => {
    try {
      await api.delete(`/blogs/${id}`)
      setBlogs(prev => prev.filter(blog => blog.id !== id))
      setError('')
    } catch (err) {
      setError('Failed to delete blog')
      throw err
    }
  }

  const value = {
    blogs,
    loading,
    error,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog
  }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}