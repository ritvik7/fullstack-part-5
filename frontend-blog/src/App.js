import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [notification, setNotification] = useState()

  useEffect(() => {
    const currentUserString = window.localStorage.getItem('user')
    if(currentUserString !== null & user === undefined){
      const currentUser = JSON.parse(currentUserString) 
      setUser(currentUser)
    }
    blogService.getAll().then(blogs =>setBlogs( blogs ))
  }, [user])

  const loginUser = (user) => {
    loginService
      .login(user)
      .then(result => {
        window.localStorage.setItem('user', JSON.stringify(result))
        setUser(result)
      })
      .catch(error => {
        setNotification({status:'fail', message:'Invalid username or password'})
        setTimeout(() => setNotification(), 3000)
      })
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser()
  }

  const createBlog = (blog) => {
    blogService
    .create(blog, user.token)
    .then(newBlog => {
      setBlogs(blogs.concat(newBlog))
      setNotification({status:'success', message: `${newBlog.title} by ${newBlog.author} added`})
      setTimeout(() => setNotification(), 3000)
    })
  }

  const likeBlog = (blog) => {
    blogService
    .like(blog)
    .then(likedBlog => 
      setBlogs(blogs
      .map(b => b.id===blog.id? likedBlog : b)
      .sort((b1, b2) => b2.likes - b1.likes))
    )
  }

  const removeBlog = (blog) => {
    blogService
    .remove(blog, user.token)
    .then(result => setBlogs(blogs.filter(b => b.id!==blog.id)))
  }

  return (
    <div>
      {notification !== undefined && <Notification notification={notification}/>}
      {user === undefined && <LoginForm loginUser={loginUser} />}
      {user !== undefined && 
        <div>
          <h2>blogs</h2>
          {user.username} logged in <br/>
          <button onClick={handleLogout}>log out</button> <br/><br/>
          <BlogForm createBlog={createBlog}/>
          {blogs.map(blog =>
            <Blog user={user} key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App