// src/pages/Blogs.jsx
import React, { useState } from 'react'
import { useBlogs } from '../context/BlogContext'
import BlogCard from '../components/Blog/BlogCard'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const { blogs, loading, error, deleteBlog } = useBlogs()
  const [filter, setFilter] = useState('all')

  const filteredBlogs = filter === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.status === filter)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Blogs</h1>
        <Link
          to="/create-blog"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create New Blog
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Filter Blogs</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md ${
                filter === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-3 py-1 rounded-md ${
                filter === 'published' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-3 py-1 rounded-md ${
                filter === 'draft' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No blogs found.</p>
          </div>
        ) : (
          filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} onDelete={deleteBlog} />
          ))
        )}
      </div>
    </div>
  )
}

export default Blogs