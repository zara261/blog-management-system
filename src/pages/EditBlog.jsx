// src/pages/EditBlog.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlogs } from '../context/BlogContext'
import BlogForm from '../components/Blog/BlogForm'

const EditBlog = () => {
  const { id } = useParams()
  const { blogs, updateBlog } = useBlogs()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const foundBlog = blogs.find(b => b.id === id)
    if (foundBlog) {
      setBlog(foundBlog)
    } else {
      navigate('/blogs')
    }
  }, [id, blogs, navigate])

  const handleSubmit = async (blogData) => {
    setLoading(true)
    try {
      await updateBlog(id, blogData)
      navigate('/blogs')
    } catch (error) {
      console.error('Failed to update blog:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog</h1>
      <BlogForm 
        onSubmit={handleSubmit} 
        loading={loading}
        submitText="Update Blog"
        initialData={blog}
      />
    </div>
  )
}

export default EditBlog