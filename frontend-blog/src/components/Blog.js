import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {

  const [visible, setVisible] = useState(false)
  
  const showWhenVisible = { display: visible? '' : 'none'}
  const hideWhenVisible = { display: visible? 'none' : ''}
  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  }

  const handleBlogLikes = () => {
    likeBlog(blog)
  }

  const handleBlogRemoval = () => {
    const result = window.confirm("Are you sure you want to remove this blog?")
    if(result) removeBlog(blog)
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
  }

  return (
  <div style={blogStyle}>
    <div className='blog-default' style={hideWhenVisible}>
      {blog.title} {blog.author} &nbsp;
       <button id='view-button' onClick={toggleVisibility}>view</button>
    </div>
    <div className='blog-details' style={showWhenVisible}>
      {blog.title} {blog.author} &nbsp;
       <button onClick={toggleVisibility}>hide</button> <br/>
      {blog.url} <br/>
      likes {blog.likes} <br/>
      <button id='like-button' onClick={handleBlogLikes}>like</button> <br/>
      {user.username} <br/>
      {user.username === blog.user.username && <button id='remove-button' onClick={handleBlogRemoval}>remove</button>}
    </div>
  </div>
  )
}

export default Blog