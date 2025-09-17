// src/pages/CreateBlog.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogs } from '../context/BlogContext'
import BlogForm from '../components/Blog/BlogForm'

const CreateBlog = () => {
  const { createBlog } = useBlogs()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (blogData) => {
    setLoading(true)
    try {
      await createBlog(blogData)
      navigate('/blogs')
    } catch (error) {
      console.error('Failed to create blog:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog</h1>
      <BlogForm 
        onSubmit={handleSubmit} 
        loading={loading}
        submitText="Create Blog"
      />
    </div>
  )
}

export default CreateBlog