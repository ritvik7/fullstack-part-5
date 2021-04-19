import React, { useState } from 'react'

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible? '' : 'none'}
  const hideWhenVisible = { display: visible? 'none' : ''}
  const toggleVisibility = () => setVisible(!visible)

  const handleBlog = (event) => {
    event.preventDefault()
    const newBlog = {title, author, url}
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id='create-blog-form' onClick={toggleVisibility}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form id='blog-form' onSubmit={handleBlog}>
          title: <input id='title' value={title} onChange={({target}) => setTitle(target.value)} /><br/>
          author: <input id='author' value={author} onChange={({target}) => setAuthor(target.value)} /><br/>
          url: <input id='url' value={url} onChange={({target}) => setUrl(target.value)} /><br/>
          <button type="submit">create</button>
          <button type="button" onClick={toggleVisibility}>cancel</button>
        </form>
      </div>
    </div>
  )
} 

export default BlogForm
