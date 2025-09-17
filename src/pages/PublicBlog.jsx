import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PublicBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState(null)

  useEffect(() => {
    // Fetch blogs from localStorage
    const fetchBlogs = () => {
      try {
        const blogData = JSON.parse(localStorage.getItem('blogs') || '[]')
        // Only show published blogs
        const publishedBlogs = blogData.filter(blog => blog.status === 'published')
        setBlogs(publishedBlogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#071739]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#071739] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/public-blog" className="text-2xl font-bold text-white">
              Blog Website
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/public-blog" className="text-[#A4B5C4] hover:text-white">Home</Link>
              <a href="#recent" className="text-[#A4B5C4] hover:text-white">Recent Posts</a>
              <a href="#about" className="text-[#A4B5C4] hover:text-white">About</a>
              <a href="#contact" className="text-[#A4B5C4] hover:text-white">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-r from-[#071739] to-[#4B6382]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-20 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to Our Blog
          </h1>
          <p className="mt-6 text-xl text-[#A4B5C4] max-w-3xl mx-auto">
            Discover amazing articles, insights, and stories from our writers.
          </p>
          <div className="mt-10">
            <a
              href="#recent"
              className="inline-block px-6 py-3 bg-white text-[#071739] font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
            >
              Explore Articles
            </a>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div id="recent" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-[#071739] mb-2 text-center">Recent Blog Posts</h2>
        <p className="text-[#4B6382] text-center mb-8">Discover our latest articles and insights</p>
        
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-[#A4B5C4] p-6 rounded-lg max-w-md mx-auto">
              <p className="text-[#071739] text-lg">No blog posts available yet. Check back soon!</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#A4B5C4]">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#071739] mb-2">{blog.title}</h3>
                  <p className="text-[#4B6382] mb-4">
                    {blog.content.length > 150 
                      ? `${blog.content.substring(0, 150)}...` 
                      : blog.content
                    }
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#4B6382]">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="text-[#071739] hover:text-[#4B6382] font-medium flex items-center"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About Section */}
      <div id="about" className="bg-[#071739] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">About Our Blog</h2>
            <div className="w-20 h-1 bg-[#A4B5C4] mx-auto my-4"></div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-[#A4B5C4] mb-6">
                We are passionate about sharing knowledge, insights, and stories that matter. Our blog is dedicated to 
                providing valuable content that inspires, educates, and connects with our readers.
              </p>
              <p className="text-[#A4B5C4] mb-6">
                Our team of writers and contributors are experts in their fields, bringing you the latest trends, 
                thought-provoking ideas, and practical advice across various topics.
              </p>
              <div className="bg-[#4B6382] p-4 rounded-lg">
                <p className="text-white italic">"The art of writing is the art of discovering what you believe."</p>
                <p className="text-[#A4B5C4] mt-2">- Gustave Flaubert</p>
              </div>
            </div>
            
            <div className="bg-[#4B6382] p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-white mb-4">Why Read Our Blog?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#A4B5C4] mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-[#A4B5C4]">Quality content curated by experts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#A4B5C4] mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-[#A4B5C4]">Diverse topics and perspectives</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#A4B5C4] mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-[#A4B5C4]">Regular updates with fresh content</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#A4B5C4] mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-[#A4B5C4]">Engaging community of readers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="text-2xl font-bold text-[#071739]">{selectedBlog.title}</h3>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-[#4B6382] whitespace-pre-line">{selectedBlog.content}</p>
              </div>
              
              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <span className="text-sm text-[#4B6382]">
                  Published on {new Date(selectedBlog.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-[#4B6382]">
                  By {selectedBlog.author || 'Admin'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="bg-[#071739] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Blog Website</h3>
              <p className="text-[#A4B5C4]">
                We are passionate about sharing knowledge and insights through our blog posts.
                Join our community of readers and writers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/public-blog" className="text-[#A4B5C4] hover:text-white">Home</Link></li>
                <li><a href="#recent" className="text-[#A4B5C4] hover:text-white">Recent Posts</a></li>
                <li><a href="#about" className="text-[#A4B5C4] hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-[#A4B5C4]">Email: contact@blogwebsite.com</p>
              <p className="text-[#A4B5C4]">Phone: (123) 456-7890</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-[#A4B5C4] hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-[#A4B5C4] hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-[#A4B5C4] hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#4B6382] text-center">
            <p className="text-[#A4B5C4]">© 2023 Blog Website. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicBlog