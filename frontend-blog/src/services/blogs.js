import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog, token) => {
  const request = axios.post(baseUrl, blog, {headers: {'Authorization': `bearer ${token}`}})
  return request.then(response => response.data)
}

const like = (blog) => {
  blog.likes = blog.likes + 1
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.then(response => response.data)
}

const remove = (blog, token) => {
  const request = axios.delete(`${baseUrl}/${blog.id}`, {data: blog, headers: {'Authorization': `bearer ${token}`}})
  return request.then(response => response.data)
} 

export default { getAll, create, like, remove }